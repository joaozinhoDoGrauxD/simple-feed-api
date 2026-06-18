import { runMultiEnvTest } from '../utils/multiEnvRunner';

const sum = (a: number, b: number): number => {
    return a + b
}

runMultiEnvTest('Soma de 1 + 2 deve ser igual a 3', ({ expect }) => {
    expect(sum(1, 2)).toBe(3);
});