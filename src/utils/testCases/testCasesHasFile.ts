import { audioExtensions, imageExtensions, name, exampleHtml, exampleNoHtml } from "@/utils/testConsts/testConstsHasFiles";
export const testCasesAudioTrue = audioExtensions.map((ext) => ({
  description: `Deve validar com sucesso o formato de áudio: ${ext}`,
  value: name + ext 
}));

export const testCasesImageTrue = imageExtensions.map((ext) => ({
  description: `Deve validar com sucesso o formato da imagem: ${ext}`,
  value: name + ext 
}));

export const testCasesAudioFalse= audioExtensions.map((ext) => ({
  description: `Deve dar errado a validação para Aúdio nesses formatos: ${ext}`,
  value: name + ext 
}));

export const testCasesImageFalse = imageExtensions.map((ext) => ({
  description: `Deve dar errado a validação para Imagem nesses formatos: ${ext}`,
  value: name + ext
}));

export const testCasesHtmlTrue = exampleHtml.map((html, num) => ({
    description: `Deve validar como sucesso esse ${num+1}º HTML:\n${html}`,
    value: html
}));

export const testCasesHtmlFalse = exampleNoHtml.map((text,num) => ({
    description: `Deve dar errado a validação HTML para esse ${num+1}º texto:\n${text}`,
    value: text
}))