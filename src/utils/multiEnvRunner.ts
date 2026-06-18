import os from 'os';
import loadBunTest from './loadModule';
import { describe, test, expect } from '@jest/globals';

import type {  GenericExpect, TestCallback } from '@/types/tests.types';

export async function runMultiEnvTest(description: string, callback: TestCallback) {
  if (os.platform() === 'win32') {
    describe(description, () => {
      test('Executando via Jest', () => {
        callback({ expect: expect as GenericExpect});
      });
    });
  } else {
    try {
      const bun = await loadBunTest();
      if (bun) {
        bun.test(description, () => {
          callback({ expect: bun.expect as GenericExpect });
        });
      } else {
        console.log(`[Aviso] Bun não detectado para o teste: "${description}"`);
      }
    } catch (error) {
      console.error('Erro ao executar teste no ambiente Bun:', error);
    }
  }
}
