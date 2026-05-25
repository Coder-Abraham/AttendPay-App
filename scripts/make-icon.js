/**
 * Creates a 1024x1024 square icon from uict-logo.png
 * Run: node scripts/make-icon.js
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../assets/images/uict-logo.png');
const outputPath = path.join(__dirname, '../assets/images/icon-square.png');

// Try using sharp if available
try {
  const sharp = require('sharp');
  sharp(inputPath)
    .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 96, b: 184, alpha: 1 } })
    .png()
    .toFile(outputPath)
    .then(() => console.log('✓ Created icon-square.png'))
    .catch(e => console.error(e));
} catch {
  console.log('sharp not installed. Install it with: npm install sharp');
  console.log('Or manually resize uict-logo.png to 1024x1024 and save as assets/images/icon-square.png');
}
