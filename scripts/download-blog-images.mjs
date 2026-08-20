import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.juliemorganbooks.com';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const OUTPUT_DIR = 'blog_images';

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { ...options, headers: { ...options.headers, 'User-Agent': USER_AGENT } });
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      return res;
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`   ⚠️ Fetch failed, retrying in 5s... (${i + 1}/${retries})`);
      await sleep(5000);
    }
  }
}

async function downloadImage(url, destPath) {
  try {
    const res = await fetchWithRetry(url);
    const buffer = await res.buffer();
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(` ❌ Error downloading ${url}: ${err.message}`);
    return false;
  }
}

async function scrapePage(url) {
  console.log(`\n📄 Processing index page: ${url}`);
  const res = await fetchWithRetry(url);
  const html = await res.text();
  const dom = new JSDOM(html);
  return dom.window.document;
}

async function scrapePostImages(url) {
  console.log(` 🔍 Scraping images from: ${url}`);
  try {
    const res = await fetchWithRetry(url);
    const html = await res.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

  const title = doc.querySelector('.blog-title, h2.blog-title')?.textContent?.trim() || 'Untitled Post';
  const images = Array.from(doc.querySelectorAll('.blog-content img, .blog-post-content img'))
    .map(img => img.src)
    .filter(src => src && !src.includes('pixel'));

  if (images.length === 0) return;

  // Clean title for folder name
  const folderName = title.replace(/[/\\?%*:|"<>]/g, '-').substring(0, 100);
  const postDir = path.join(OUTPUT_DIR, folderName);

  if (fs.existsSync(postDir) && fs.readdirSync(postDir).length > 0) {
    console.log(`   ⏭️ Skipping (already downloaded)`);
    return;
  }

  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  for (let i = 0; i < images.length; i++) {
    const imgUrl = images[i].startsWith('http') ? images[i] : (images[i].startsWith('//') ? 'https:' + images[i] : BASE_URL + images[i]);
    const ext = path.extname(imgUrl.split('?')[0]) || '.jpg';
    const fileName = `image_${i + 1}${ext}`;
    const destPath = path.join(postDir, fileName);

    console.log(`   💾 Downloading image ${i + 1}/${images.length}...`);
    await downloadImage(imgUrl, destPath);
  }
  } catch (err) {
    console.error(` ❌ Error scraping post images at ${url}: ${err.message}`);
  }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  let currentPageUrl = `${BASE_URL}/blog.html`;
  const seenPosts = new Set();

  while (currentPageUrl) {
    const doc = await scrapePage(currentPageUrl);
    
    const postLinks = Array.from(doc.querySelectorAll('a'))
      .map(a => a.getAttribute('href'))
      .filter(href => {
        if (!href || href.includes('#comments')) return false;
        const fullHref = href.startsWith('http') ? href : (href.startsWith('//') ? 'https:' + href : BASE_URL + (href.startsWith('/') ? href : '/' + href));
        const isOnDomain = fullHref.includes('juliemorganbooks.com');
        return isOnDomain && fullHref.includes('/blog/') && !fullHref.includes('/category/') && !fullHref.includes('/archives/') && !fullHref.includes('/previous/') && fullHref.split('/blog/')[1]?.length > 0;
      })
      .map(href => {
        if (href.startsWith('http')) return href;
        if (href.startsWith('//')) return 'https:' + href;
        return BASE_URL + (href.startsWith('/') ? href : '/' + href);
      });

    const uniqueLinks = [...new Set(postLinks)];
    for (const link of uniqueLinks) {
      if (seenPosts.has(link)) continue;
      seenPosts.add(link);
      
      await scrapePostImages(link);
      await sleep(2000); // Wait 2 seconds between posts
    }

    const nextLink = Array.from(doc.querySelectorAll('a'))
      .find(a => a.textContent?.includes('Previous'))?.getAttribute('href');
    
    currentPageUrl = nextLink ? (nextLink.startsWith('http') ? nextLink : BASE_URL + nextLink) : null;
    
    if (seenPosts.size > 1000) break;
  }

  console.log(`\n✨ Finished downloading images for ${seenPosts.size} posts.`);
}

main().catch(console.error);
