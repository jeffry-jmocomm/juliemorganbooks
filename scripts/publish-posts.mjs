import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2023-05-03',
});

async function publishPosts() {
  console.log('🔍 Fetching all blog post drafts...');
  
  // Fetch all documents that are drafts
  const drafts = await client.fetch(`*[_type == "post" && _id in path("drafts.**")]`);
  
  if (drafts.length === 0) {
    console.log('✨ No drafts found to publish.');
    return;
  }

  console.log(`🚀 Publishing ${drafts.length} posts...`);

  const transaction = client.transaction();

  for (const draft of drafts) {
    const publishedId = draft._id.replace('drafts.', '');
    
    // Create the published version (removing the draft prefix)
    const { _id, _updatedAt, _createdAt, ...publishedDoc } = draft;
    
    transaction.createOrReplace({
      ...publishedDoc,
      _id: publishedId,
    });

    // Delete the draft version
    transaction.delete(draft._id);
  }

  try {
    await transaction.commit();
    console.log(`\n✅ Successfully published all ${drafts.length} posts!`);
  } catch (err) {
    console.error(`\n❌ Error during publication: ${err.message}`);
  }
}

publishPosts().catch(console.error);
