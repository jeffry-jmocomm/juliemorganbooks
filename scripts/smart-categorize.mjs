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

const CATEGORIES = [
  { title: 'Book Releases', slug: 'book-releases', keywords: ['live', 'published', 'ready', 'available', 'launch', 'release'] },
  { title: 'Cover Reveals', slug: 'cover-reveals', keywords: ['cover reveal', 'new face'] },
  { title: 'Giveaways & Contests', slug: 'giveaways', keywords: ['giveaway', 'contest', 'win', 'drawing', 'swag', 'raffle'] },
  { title: 'Events & Signings', slug: 'events', keywords: ['signing', 'con', 'event', 'tour', 'aad', 'convention'] },
  { title: 'Sales & Deals', slug: 'sales', keywords: ['sale', 'cents', 'ku', 'kindle unlimited', 'discount', 'free', 'preorder'] },
  { title: 'Writing Life', slug: 'writing-life', keywords: ['writing', 'muses', 'process', 'teaser', 'blurb', 'snippet'] },
];

async function categorize() {
  console.log('🚀 Starting Smart Categorization...');

  // 1. Create categories in Sanity
  const categoryMap = {};
  for (const cat of CATEGORIES) {
    const doc = await client.createIfNotExists({
      _type: 'category',
      _id: `cat-${cat.slug}`,
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
    });
    categoryMap[cat.slug] = doc._id;
    console.log(`✅ Category ensured: ${cat.title}`);
  }

  // 2. Fetch all posts
  console.log('🔍 Fetching posts...');
  const posts = await client.fetch(`*[_type == "post"] { _id, title }`);
  console.log(`📝 Analyzing ${posts.length} posts...`);

  let patchedCount = 0;
  for (const post of posts) {
    const matchedCategoryIds = [];
    const titleLower = post.title.toLowerCase();

    for (const cat of CATEGORIES) {
      if (cat.keywords.some(kw => titleLower.includes(kw))) {
        matchedCategoryIds.push({
          _type: 'reference',
          _ref: categoryMap[cat.slug],
          _key: `key-${cat.slug}` // Required for array members
        });
      }
    }

    if (matchedCategoryIds.length > 0) {
      await client
        .patch(post._id)
        .setIfMissing({ categories: [] })
        .set({ categories: matchedCategoryIds })
        .commit();
      
      patchedCount++;
      if (patchedCount % 20 === 0) console.log(`🏷️  Tagged ${patchedCount} posts so far...`);
    }
  }

  console.log(`\n✨ Smart Categorization complete!`);
  console.log(`✅ Tagged ${patchedCount} out of ${posts.length} posts.`);
}

categorize().catch(console.error);
