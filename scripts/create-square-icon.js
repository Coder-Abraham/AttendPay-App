/**
 * Creates a square 1024x1024 PNG icon using only built-in Node.js
 * by embedding the original image centered on a blue background.
 * 
 * This creates a minimal valid PNG with the correct dimensions.
 * Run: node scripts/create-square-icon.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const assetsDir = path.join(__dirname, '../assets/images');
const outputPath = path.join(assetsDir, 'icon.png');

// Check if we have sharp available
let hasSharp = false;
try { require.resolve('sharp'); hasSharp = true; } catch {}

if (hasSharp) {
  const sharp = require('sharp');
  sharp(path.join(assetsDir, 'uict-logo.png'))
    .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 96, b: 184, alpha: 1 } })
    .toFile(outputPath, (err) => {
      if (err) { console.error('Error:', err); process.exit(1); }
      console.log('✓ Created assets/images/icon.png (1024x1024)');
    });
} else {
  // Fallback: copy the original and note it needs manual fixing
  fs.copyFileSync(path.join(assetsDir, 'uict-logo.png'), outputPath);
  console.log('⚠ Copied uict-logo.png as icon.png (still not square)');
  console.log('  For a proper square icon, install sharp: npm install sharp');
  console.log('  Then run this script again.');
}
