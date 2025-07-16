const fs = require('fs');
const axios = require('axios');
const archiver = require('archiver');
const path = require('path');

// Helper function: Downloads an image from a URL to a specified local filepath.
async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('finish', resolve)
      .on('error', reject);
  });
}

(async () => {
  // Define the list of images to download.
  // Replace these URLs with secure sources or your chosen URLs.
  const images = [
    { name: 'moodboard1.jpg', url: 'https://via.placeholder.com/600x400?text=Moodboard1' },
    { name: 'moodboard2.jpg', url: 'https://via.placeholder.com/600x400?text=Moodboard2' },
    { name: 'moodboard3.jpg', url: 'https://via.placeholder.com/600x400?text=Moodboard3' }
  ];

  // Create a folder to temporarily store downloaded images.
  const downloadDir = path.join(__dirname, 'downloads');
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }

  // Download each image.
  for (const image of images) {
    const filepath = path.join(downloadDir, image.name);
    console.log(`Downloading ${image.url} -> ${filepath}`);
    try {
      await downloadImage(image.url, filepath);
      console.log(`Downloaded ${image.name}`);
    } catch (error) {
      console.error(`Failed to download ${image.url}: `, error);
    }
  }

  // Create a ZIP archive containing the downloaded images.
  const zipPath = path.join(__dirname, 'moodboards.zip');
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 }});

  // Listen for archive completion.
  output.on('close', () => {
    console.log(`moodboards.zip created. Total bytes: ${archive.pointer()}`);
    console.log(`ZIP file available at: ${zipPath}`);
  });

  // Catch warnings (e.g., stat failures) and errors.
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  // Append the contents of the downloads directory (without the directory itself).
  archive.directory(downloadDir, false);
  await archive.finalize();
})();
