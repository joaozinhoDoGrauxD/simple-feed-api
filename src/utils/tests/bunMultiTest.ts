import {describe, expect, test} from "bun:test"
import type { GenericExpect } from '@/types/tests.types';

interface TestCase {
  description: string;
  value: string;
}

export function bunMultiTest(
  suiteTitle: string, 
  cases: TestCase[], 
  callback: (value: string, helpers: { expect: GenericExpect }) => void
) {
        describe(suiteTitle, () => {
          cases.forEach((c) => {
            test(c.description, () => {
              callback(c.value, { expect: expect as GenericExpect });
            });
          });
        });
    
  }