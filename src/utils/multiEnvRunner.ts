import os from 'os';
import loadBunTest from './loadModule';
import { describe, test, expect } from '@jest/globals';
import type { GenericExpect } from '@/types/tests.types';

// Definindo a estrutura de cada cenário individual
interface TestCase {
  description: string;
  value: string;
}

export async function runMultiEnvTest(
  suiteTitle: string, 
  cases: TestCase[], 
  callback: (value: string, helpers: { expect: GenericExpect }) => void
) {
  if (os.platform() === 'win32') {
    // Título único para o bloco do Jest
    describe(suiteTitle, () => {
      // Loop cria um 'test' com descrição diferente para cada expect
      cases.forEach((c) => {
        test(c.description, () => {
          callback(c.value, { expect: expect as GenericExpect });
        });
      });
    });
  } else {
    try {
      const bun = await loadBunTest();
      if (bun) {
        // Título único para o bloco do Bun
        bun.describe(suiteTitle, () => {
          cases.forEach((c) => {
            bun.test(c.description, () => {
              callback(c.value, { expect: bun.expect as GenericExpect });
            });
          });
        });
      } else {
        console.log(`[Aviso] Bun não detectado para o teste: "${suiteTitle}"`);
      }
    } catch (error) {
      console.error('Erro ao executar teste no ambiente Bun:', error);
    }
  }
}