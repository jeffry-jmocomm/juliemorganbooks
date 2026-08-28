import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import BlogSidebar from "@/components/BlogSidebar";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  mainImage,
  publishedAt,
  body,
  author->{
    name,
    image,
    bio
  },
  categories[]->{
    title,
    slug
  }
}`;

const YEARS_QUERY = `array::unique(*[_type == "post"].publishedAt[0..400]) | order(@ desc)`;
const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  title,
  "slug": slug.current
}`;

const RELATED_POSTS_QUERY = `*[_type == "post" && slug.current != $slug && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt
}`;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-[var(--color-brand-purple-light)] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const categoryIds = post.categories?.map((cat: any) => cat._id) || [];
  const relatedPosts = categoryIds.length > 0 
    ? await client.fetch(RELATED_POSTS_QUERY, { slug, categoryIds })
    : [];
  
  // Get all unique years and categories for the sidebar
  const allDates = await client.fetch(YEARS_QUERY);
  const years = [...new Set(allDates.map((date: string) => date?.substring(0, 4)))].filter(Boolean);
  const allCategories = await client.fetch(CATEGORIES_QUERY);

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-12">
        <article className="lg:col-span-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12"
          >
            <ChevronLeft size={18} /> Back to Chronicle
          </Link>

          {post.mainImage && (
            <div className="relative rounded-3xl overflow-hidden mb-12 bg-slate-900/20 shadow-2xl shadow-purple-500/10">
              <img
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <header className="mb-12">
            {/* Category Tags */}
            {post.categories?.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {post.categories.map((cat: any) => (
                  <Link 
                    // key={cat.slug.current} 
                    // href={`/blog?category=${cat.slug.current}`}
                    key={cat.slug ?? cat.title}
                    href={`/blog?category=${cat.slug}`}
                    className="px-3 py-1 rounded-full bg-white/5 text-xs uppercase tracking-widest text-[var(--color-brand-purple-light)] hover:bg-white/10 transition-colors"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text pb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              {post.author?.image && (
                <img
                  src={urlFor(post.author.image).width(100).height(100).url()}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full border border-white/10"
                />
              )}
              <div>
                <p className="text-white/90 font-medium">{post.author?.name}</p>
                {post.publishedAt && (
                  <p className="text-slate-500 text-sm">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-purple max-w-none mb-20">
            <PortableText
              value={post.body}
              components={{
                types: {
                  image: ({ value }: any) => (
                    <div className="my-10 rounded-2xl overflow-hidden border border-white/10">
                      <img
                        src={urlFor(value).url()}
                        alt="Content image"
                        className="w-full h-auto"
                      />
                    </div>
                  ),
                },
                block: {
                  h2: ({ children }: any) => (
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-white/90">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }: any) => (
                    <h3 className="text-2xl font-bold mt-8 mb-4 text-white/90">
                      {children}
                    </h3>
                  ),
                  normal: ({ children }: any) => (
                    <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                      {children}
                    </p>
                  ),
                },
              }}
            />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-20 pt-20 border-t border-white/5">
              <h3 className="text-2xl font-bold mb-8">Related Chronicles</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-20">
                {relatedPosts.map((rel: any) => (
                  <Link 
                    key={rel._id} 
                    href={`/blog/${rel.slug.current}`}
                    className="group"
                  >
                    <div className="aspect-video relative rounded-xl overflow-hidden mb-4 bg-white/5">
                      {rel.mainImage && (
                        <img 
                          src={urlFor(rel.mainImage).width(400).height(225).url()} 
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <h4 className="font-bold text-sm line-clamp-2 group-hover:text-[var(--color-brand-purple-light)] transition-colors">
                      {rel.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center gap-8 glass-panel p-8 rounded-3xl">
            {post.author?.image && (
              <img
                src={urlFor(post.author.image).width(200).height(200).url()}
                alt={post.author.name}
                className="w-24 h-24 rounded-full border border-white/10"
              />
            )}
            <div>
              <h4 className="text-xl font-bold mb-2">About {post.author?.name}</h4>
              <div className="text-slate-500 text-sm">
                 <PortableText value={post.author?.bio} />
              </div>
            </div>
          </div>
        </article>

        <div className="lg:col-span-1">
          <BlogSidebar 
            years={years as string[]} 
            categories={allCategories}
          />
        </div>
      </div>
    </div>
  );
}
