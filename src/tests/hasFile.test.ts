import { bunMultiTest } from '@/utils/tests/bunMultiTest';
import { hasAudio, hasImage, hasHTML } from '@/utils/functions/hasFile';
import { testCasesAudioTrue, testCasesAudioFalse, testCasesImageTrue, testCasesImageFalse, testCasesHtmlTrue, testCasesHtmlFalse} from '@/utils/testCases/testCasesHasFile';

bunMultiTest('Suíte de Validação de Arquivos de Áudio', testCasesAudioTrue, (fileName, { expect }) => {
  expect(hasAudio(fileName)).toBe(true);
});

bunMultiTest('Suíte de Validação de Arquivos de Imagem', testCasesImageTrue, (fileName,{ expect }) => {
        expect(hasImage(fileName)).toBe(true);
    });

 bunMultiTest('Suíte de Validação de HTML', testCasesHtmlTrue, (html, {expect}) => {
    expect(hasHTML(html)).toBe(true)
 })

bunMultiTest('Suíte de Invalidação de Arquivos de Imagem', testCasesAudioFalse, (fileName,{ expect }) => {
        expect(hasImage(fileName)).toBe(false);
    });

bunMultiTest('Suíte de Invalidação de Arquivos de Áudio', testCasesImageFalse, (fileName, { expect }) => {
  expect(hasAudio(fileName)).toBe(false);
});


 bunMultiTest('Suíte de Invalidação de HTML', testCasesHtmlFalse, (html, {expect}) => {
    expect(hasHTML(html)).toBe(false)
 })

