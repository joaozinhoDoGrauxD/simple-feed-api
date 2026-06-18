export const hasHTML = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);
export const hasAudio = (str: string) =>
  /\.(mp3|wav|flac|aac|ogg|m4a)(\/|\?|$)/i.test(str);
export const hasImage = (str: string) =>
  /\.(jpg|jpeg|png|gif|webp|svg)(\/|\?|$)/i.test(str);
