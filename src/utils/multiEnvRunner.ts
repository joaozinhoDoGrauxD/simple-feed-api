import os from 'os';
import loadBunTest from '@/utils/loadModule';
import { describe, test, expect } from '@jest/globals';
import type { GenericExpect } from '@/types/tests.types';

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
    describe(suiteTitle, () => {
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