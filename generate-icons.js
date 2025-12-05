const sharp = require('sharp');
const fs = require('fs');

const svg = fs.readFileSync('icon.svg');

async function generateIcons() {
    await sharp(svg)
        .resize(192, 192)
        .png()
        .toFile('icon-192.png');

    await sharp(svg)
        .resize(512, 512)
        .png()
        .toFile('icon-512.png');

    console.log('Icons generated!');
}

generateIcons().catch(console.error);
