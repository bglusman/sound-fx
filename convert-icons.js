const sharp = require('sharp');
const path = require('path');

const icons = [
    { src: '008603_00.jpg', dest: 'yawn.png' },
    { src: '1-inst-hand-clapping-35522.jpg', dest: 'slow-clap.png' },
    { src: '71QSwh6GHkL._AC_UF894,1000_QL80_.jpg', dest: 'rimshot.png' },
    { src: '83664037_000_d.webp', dest: 'sad-violin.png' },
    { src: '600x400_Cricket-ID.png.webp', dest: 'crickets.png' },
    { src: 'GettyImages-497801064-1.jpg.webp', dest: 'baby-crying.png' },
];

const downloads = '/Users/80260986/Downloads';
const iconsDir = '/Users/80260986/jerry_soundfx/icons';

async function convertIcons() {
    for (const icon of icons) {
        const srcPath = path.join(downloads, icon.src);
        const destPath = path.join(iconsDir, icon.dest);

        try {
            await sharp(srcPath)
                .resize(200, 200, {
                    fit: 'cover',
                    position: 'center'
                })
                .png()
                .toFile(destPath);
            console.log(`Created: ${icon.dest}`);
        } catch (err) {
            console.error(`Error converting ${icon.src}:`, err.message);
        }
    }
    console.log('Done!');
}

convertIcons();
