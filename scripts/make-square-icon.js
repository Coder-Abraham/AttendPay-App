/**
 * Creates a square 1024x1024 version of the icon
 * by padding the non-square image onto a colored background.
 * Run: node scripts/make-square-icon.js
 */
const fs = require('fs');
const path = require('path');

// Check if sharp is available, if not use a simple approach
try {
  const sharp = require('sharp');
  const inputPath = path.join(__dirname, '../assets/images/uict-logo.png');
  const outputPath = path.join(__dirname, '../assets/images/icon.png');

  sharp(inputPath)
    .resize(1024, 1024, {
      fit: 'contain',
      background: { r: 0, g: 96, b: 184, alpha: 1 }, // #0060B8
    })
    .toFile(outputPath, (err) => {
      if (err) console.error('Error:', err);
      else console.log('Created square icon at assets/images/icon.png');
    });
} catch {
  console.log('sharp not available. Please manually create a 1024x1024 square version of uict-logo.png and save it as assets/images/icon.png');
  console.log('You can use any image editor (Paint, Photoshop, GIMP, or online at squoosh.app)');
  console.log('Steps: Open uict-logo.png → Canvas size → 752x752 → center image → export as icon.png');
}
