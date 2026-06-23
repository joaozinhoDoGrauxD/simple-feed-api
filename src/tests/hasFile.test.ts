import { runMultiEnvTest } from '@/utils/tests/multiEnvRunner';
import { hasAudio, hasImage, hasHTML } from '@/utils/functions/hasFile';
import { testCasesAudioTrue, testCasesAudioFalse, testCasesImageTrue, testCasesImageFalse, testCasesHtmlTrue, testCasesHtmlFalse} from '@/utils/testCases/testCasesHasFile';

runMultiEnvTest('Suíte de Validação de Arquivos de Áudio', testCasesAudioTrue, (fileName, { expect }) => {
  expect(hasAudio(fileName)).toBe(true);
});

runMultiEnvTest('Suíte de Validação de Arquivos de Imagem', testCasesImageTrue, (fileName,{ expect }) => {
        expect(hasImage(fileName)).toBe(true);
    });

 runMultiEnvTest('Suíte de Validação de HTML', testCasesHtmlTrue, (html, {expect}) => {
    expect(hasHTML(html)).toBe(true)
 })

runMultiEnvTest('Suíte de Invalidação de Arquivos de Imagem', testCasesAudioFalse, (fileName,{ expect }) => {
        expect(hasImage(fileName)).toBe(false);
    });

runMultiEnvTest('Suíte de Invalidação de Arquivos de Áudio', testCasesImageFalse, (fileName, { expect }) => {
  expect(hasAudio(fileName)).toBe(false);
});


 runMultiEnvTest('Suíte de Invalidação de HTML', testCasesHtmlFalse, (html, {expect}) => {
    expect(hasHTML(html)).toBe(false)
 })

