import { runMultiEnvTest } from '../utils/multiEnvRunner';
import { hasAudio, hasImage } from '@/utils/hasFile';

const imageExtensions = ["jpg","jpeg","png","gif","webp","svg"]
const audioExtensions = ["mp3", "wav", "flac", "aac", "ogg", "m4a"];
const name = "sample.";

const testCasesAudioTrue = audioExtensions.map((ext) => ({
  description: `Deve validar com sucesso o formato de áudio: ${ext}`,
  value: name + ext 
}));

const testCasesImageTrue = imageExtensions.map((ext) => ({
  description: `Deve validar com sucesso o formato da imagem: ${ext}`,
  value: name + ext 
}));

const testCasesAudioFalse= audioExtensions.map((ext) => ({
  description: `Deve dar errado o formato de áudio: ${ext}`,
  value: name + ext 
}));

const testCasesImageFalse = imageExtensions.map((ext) => ({
  description: `Deve dar errado o formato da imagem: ${ext}`,
  value: name + ext 
}));

runMultiEnvTest('Suíte de Validação de Arquivos de Áudio', testCasesAudioTrue, (fileName, { expect }) => {
  expect(hasAudio(fileName)).toBe(true);
});

runMultiEnvTest('Suíte de Validação de Arquivos de Imagem', testCasesImageTrue, (fileName,{ expect }) => {
        expect(hasImage(fileName)).toBe(true);
    });

runMultiEnvTest('Suíte de Invalidação de Arquivos de Imagem', testCasesAudioFalse, (fileName,{ expect }) => {
        expect(hasImage(fileName)).toBe(false);
    });

runMultiEnvTest('Suíte de Invalidação de Arquivos de Áudio', testCasesImageFalse, (fileName, { expect }) => {
  expect(hasAudio(fileName)).toBe(false);
});