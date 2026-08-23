import { createClient } from '@sanity/client';
import Parser from 'rss-parser';
import { htmlToBlocks } from '@portabletext/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
// Replace with your actual write token from sanity.io/manage
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN; 

const client = createClient({
  projectId: 'hurv29jx', // From your .env.local
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: SANITY_TOKEN,
  useCdn: false,
});

// We need a schema instance to help block-tools understand how to convert HTML
// This is a simplified version of your post schema's body field
const defaultSchema = Schema.compile({
  types: [
    {
      type: 'object',
      name: 'post',
      fields: [
        {
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
  ],
});

// The block-tools need to know the exact block type for conversion
const blockContentType = defaultSchema
  .get('post')
  .fields.find((field) => field.name === 'body').type;

const parser = new Parser();

async function migrate() {
  const DRY_RUN = process.env.DRY_RUN === 'true' || !SANITY_TOKEN;

  if (DRY_RUN) {
    console.log('🧪 DRY RUN MODE: No changes will be made to Sanity.');
    if (!SANITY_TOKEN) {
      console.log('ℹ️  (To perform a real migration, please add SANITY_WRITE_TOKEN to .env.local)');
    }
  } else {
    console.log('🚀 Starting REAL migration from Weebly RSS...');
  }

  try {
    const feed = await parser.parseURL('https://www.juliemorganbooks.com/1/feed');
    console.log(`\nFound ${feed.items.length} items in feed.\n`);

    // 1. Get or Create Author
    let authorId;
    const authors = await client.fetch('*[_type == "author"][0]{_id}');
    if (authors) {
      authorId = authors._id;
      console.log(`👤 Using existing author: ${authorId}`);
    } else {
      const newAuthor = await client.create({
        _type: 'author',
        name: 'Julie Morgan',
        slug: { _type: 'slug', current: 'julie-morgan' },
      });
      authorId = newAuthor._id;
      console.log(`👤 Created new author: ${authorId}`);
    }

    for (const item of feed.items) {
      const title = item.title;
      const slug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      const publishedAt = new Date(item.pubDate).toISOString();
      const contentHtml = item['content:encoded'] || item.content || item.summary || '';

      console.log(`📝 Processing: "${title}" (${publishedAt})`);

      // Convert HTML to Portable Text blocks
      const blocks = htmlToBlocks(contentHtml, blockContentType, {
        parseHtml: (html) => new JSDOM(html).window.document,
      });

      // Simple excerpt
      const excerpt = item.contentSnippet?.slice(0, 160) + '...';

      const doc = {
        _type: 'post',
        _id: `drafts.migrated-${slug}`, // Creates a draft version
        title,
        slug: { _type: 'slug', current: slug },
        author: { _type: 'reference', _ref: authorId },
        publishedAt,
        excerpt,
        body: blocks,
      };

      try {
        if (DRY_RUN) {
          console.log(` ✨ [DRY RUN] Would import: ${slug}`);
        } else {
          await client.createOrReplace(doc);
          console.log(` ✅ Imported: ${slug}`);
        }
      } catch (err) {
        console.error(` ❌ Failed to import ${slug}:`, err.message);
      }
    }

    console.log('\n✨ Migration complete!');
  } catch (err) {
    console.error('💥 Fatal error:', err);
  }
}

migrate();
