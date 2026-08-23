import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2023-05-03',
});

const IMAGES_DIR = 'blog_images';

async function patchImages() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Folder ${IMAGES_DIR} not found. Please run the download script first.`);
    return;
  }

  const folders = fs.readdirSync(IMAGES_DIR);
  console.log(`🚀 Starting patch for ${folders.length} post folders...`);

  for (const folderName of folders) {
    const folderPath = path.join(IMAGES_DIR, folderName);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    // The folder name is the (normalized) post title. 
    // We'll try to find the post by title in Sanity.
    // Note: Folder names had characters like / \ ? replaced with -
    
    const files = fs.readdirSync(folderPath).sort();
    const firstImage = files.find(f => f.startsWith('image_1.'));
    
    if (!firstImage) {
      console.log(` ⏭️ Skipping ${folderName}: No images found.`);
      continue;
    }

    const imagePath = path.join(folderPath, firstImage);

    // Find the post in Sanity. We search for drafts first.
    // We try to match by title (case-insensitive-ish or by partial match)
    // Actually, let's try to match by title directly.
    const query = `*[_type == "post" && title match $title][0]`;
    // We need to handle the fact that we normalized the folder name.
    // Most titles won't have the replaced characters, so it should match.
    const post = await client.fetch(query, { title: folderName.replace(/-/g, '*') });

    if (!post) {
      console.log(` ⚠️ Could not find post in Sanity for folder: ${folderName}`);
      continue;
    }

    console.log(` 📸 Patching: "${post.title}" with ${firstImage}...`);

    try {
      // 1. Upload image asset
      const asset = await client.assets.upload('image', fs.createReadStream(imagePath), {
        filename: firstImage,
      });

      // 2. Patch the document
      await client
        .patch(post._id)
        .set({
          mainImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
        .commit();

      console.log(`   ✅ Success!`);
    } catch (err) {
      console.error(`   ❌ Failed to patch ${post.title}: ${err.message}`);
    }
  }

  console.log(`\n✨ Patching complete!`);
}

patchImages().catch(console.error);
