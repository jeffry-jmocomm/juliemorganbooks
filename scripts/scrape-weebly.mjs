import { createClient } from '@sanity/client';
import { htmlToBlocks } from '@portabletext/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

// --- CONFIGURATION ---
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN;

const client = createClient({
  projectId: 'hurv29jx',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: SANITY_TOKEN,
  useCdn: false,
});

const defaultSchema = Schema.compile({
  types: [
    {
      type: 'object',
      name: 'post',
      fields: [{ name: 'body', type: 'array', of: [{ type: 'block' }] }],
    },
  ],
});
const blockContentType = defaultSchema.get('post').fields.find((f) => f.name === 'body').type;

const BASE_URL = 'https://www.juliemorganbooks.com';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function scrapePost(url, authorId) {
  console.log(`🔍 Scraping post: ${url}`);
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  const html = await res.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const title = doc.querySelector('.blog-title, h2.blog-title')?.textContent?.trim();
  const dateStr = doc.querySelector('.blog-date')?.textContent?.trim();
  const contentHtml = doc.querySelector('.blog-content')?.innerHTML;

  if (!title || !contentHtml) {
    console.warn(` ⚠️ Could not parse post at ${url}`);
    return null;
  }

  const publishedAt = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString();
  const slug = url.split('/').pop();

  const blocks = htmlToBlocks(contentHtml, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
  });

  return {
    _type: 'post',
    _id: `drafts.scraped-${slug}`,
    title,
    slug: { _type: 'slug', current: slug },
    author: { _type: 'reference', _ref: authorId },
    publishedAt,
    body: blocks,
  };
}

async function main() {
  if (!SANITY_TOKEN) {
    console.error('❌ SANITY_WRITE_TOKEN missing');
    process.exit(1);
  }

  const author = await client.fetch('*[_type == "author"][0]{_id}');
  const authorId = author?._id;

  let currentPageUrl = `${BASE_URL}/blog.html`;
  const seenPosts = new Set();

  while (currentPageUrl) {
    console.log(`\n📄 Processing index page: ${currentPageUrl}`);
    const res = await fetch(currentPageUrl, { headers: { 'User-Agent': USER_AGENT } });
    const html = await res.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Find all potential post links on this page
    const allLinks = Array.from(doc.querySelectorAll('a'));
    
    // Debug: log first 5 links
    console.log(` 🔍 Sample links found: ${allLinks.slice(0, 5).map(a => a.href).join(', ')}`);

    const postLinks = allLinks
      .map((a) => a.getAttribute('href')) // Use getAttribute to get exactly what's in the HTML
      .filter((href) => {
        if (!href || href.includes('#comments')) return false;
        
        // Normalize URL for checking
        let fullHref = href;
        if (href.startsWith('//')) {
          fullHref = 'https:' + href;
        } else if (!href.startsWith('http')) {
          fullHref = BASE_URL + (href.startsWith('/') ? href : '/' + href);
        }

        const isBlog = fullHref.includes('/blog/') && 
                       !fullHref.includes('/category/') && 
                       !fullHref.includes('/archives/') && 
                       !fullHref.includes('/previous/') &&
                       fullHref.split('/blog/')[1]?.length > 0;
        return isBlog;
      })
      .map((href) => {
        if (href.startsWith('//')) return 'https:' + href;
        if (href.startsWith('http')) return href;
        return BASE_URL + (href.startsWith('/') ? href : '/' + href);
      });

    // Remove duplicates from this page
    const uniqueLinks = [...new Set(postLinks)];
    
    console.log(` 🔎 Found ${uniqueLinks.length} potential post links on this page.`);

    for (const link of uniqueLinks) {
      if (seenPosts.has(link)) continue;
      seenPosts.add(link);

      const postDoc = await scrapePost(link, authorId);
      if (postDoc) {
        await client.createOrReplace(postDoc);
        console.log(` ✅ Imported: ${postDoc.slug.current}`);
      }
    }

    // Find "Previous" link (older posts)
    const nextLink = Array.from(doc.querySelectorAll('a'))
      .find((a) => a.textContent?.includes('Previous'))?.getAttribute('href');
    
    if (nextLink) {
      currentPageUrl = nextLink.startsWith('http') ? nextLink : BASE_URL + nextLink;
      console.log(` ➡️ Moving to next page: ${currentPageUrl}`);
    } else {
      currentPageUrl = null;
      console.log(' 🏁 No more pages found.');
    }
    
    // Safety break to avoid infinite loops during dev
    if (seenPosts.size > 1000) break; 
  }

  console.log(`\n✨ Done! Scraped ${seenPosts.size} posts.`);
}

main().catch(console.error);
