import {faker}  from '@faker-js/faker'

export const imageExtensions = ["jpg","jpeg","png","gif","webp","svg"]
export const audioExtensions = ["mp3", "wav", "flac", "aac", "ogg", "m4a"];
export const name = faker.internet.username() + '.';

export const exampleHtml = Array.from({ length: 5 }, () => `
<div>
    <h1>${faker.book.author()}</h1>
    <p>${faker.book.title()}</p>
</div>
`);

export const exampleNoHtml = Array.from({ length: 5 }, () => `
Autor: ${faker.book.author()}
Título: ${faker.book.title()}
`);