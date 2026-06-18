/* eslint-disable @typescript-eslint/no-explicit-any */
export type GenericExpect = (actual: any) => {
  toBe: (expected: any) => void;
  toEqual: (expected: any) => void;
  toBeDefined: () => void;
};

export type TestUtils = {
  expect: GenericExpect;
};

export type TestCallback = (utils: TestUtils) => void;