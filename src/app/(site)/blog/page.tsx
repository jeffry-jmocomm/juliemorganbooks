import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Link from "next/link";
import BlogSidebar from "@/components/BlogSidebar";

const POSTS_QUERY = `*[_type == "post" && (
  !defined($search) || 
  title match $search || 
  excerpt match $search || 
  body[].children[].text match $search
) && (
  !defined($year) || 
  string::startsWith(publishedAt, $year)
) && (
  !defined($category) || 
  $category in categories[]->slug.current
)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  author->{
    name,
    image
  },
  categories[]->{
    title,
    slug
  }
}`;

const YEARS_QUERY = `array::unique(*[_type == "post" && defined(publishedAt)].publishedAt) | order(@ desc)`;
const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  title,
  "slug": slug.current
}`;

const POSTS_PER_PAGE = 25;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    year?: string;
    category?: string;
    page?: string;
  }>;
}) {
  const { q, year, category, page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const search = q ? `${q}*` : null;
  const rawPosts = await client.fetch(POSTS_QUERY, {
    search,
    year: year || null,
    category: category || null,
  });

  // Deduplicate posts with the same title (some entries have near-identical slugs)
  const seenTitles = new Set<string>();
  const allPosts = rawPosts.filter((post: any) => {
    const normalizedTitle = post.title?.toLowerCase().trim();
    if (seenTitles.has(normalizedTitle)) return false;
    seenTitles.add(normalizedTitle);
    return true;
  });

  // Pagination
  const totalPosts = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Get all unique years for the sidebar
  const allDates: string[] = await client.fetch(YEARS_QUERY);
  const years: string[] = [
    ...new Set(allDates.map((date: string) => date?.substring(0, 4))),
  ].filter(Boolean) as string[];

  // Get all categories for the sidebar
  const categories = await client.fetch(CATEGORIES_QUERY);

  return (
    <div className="min-h-screen py-60 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text pb-4 mb-6">
            The Blog
            {year && (
              <span className="text-slate-500 font-light">: {year}</span>
            )}
            {category && (
              <span className="text-slate-500 font-light">
                : {category.replace(/-/g, " ")}
              </span>
            )}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            {year || category
              ? `Exploring the archives${year ? ` from ${year}` : ""}${category ? ` in ${category.replace(/-/g, " ")}` : ""}.`
              : "Updates, stories, and musings from the world of Julie Morgan."}
          </p>

          {(year || category || q) && (
            <div className="flex justify-center mt-6">
              <Link
                href="/blog"
                className="text-xs font-bold text-[var(--color-brand-purple-light)] hover:text-white transition-colors border border-purple-500/20 px-6 py-3 rounded-full bg-purple-500/5 shadow-lg"
              >
                ✕ Clear All Filters
              </Link>
            </div>
          )}
        </header>

        <div className="grid lg:grid-cols-[1fr_280px] gap-12 pt-8">
          {/* Main Content Area */}
          <div className="space-y-16 min-w-0">
            {posts.length === 0 ? (
              <div className="text-center py-20 glass-panel rounded-3xl">
                <p className="text-slate-500 italic">
                  No posts found for this filter. Check back soon!
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {/* Featured Post (Only on page 1 of the main unfiltered view) */}
                {!year && !category && safeCurrentPage === 1 && posts[0] && (
                  <Link
                    href={`/blog/${posts[0].slug.current}`}
                    className="group relative block glass-panel rounded-[2rem] overflow-hidden hover-glow transition-all duration-500"
                  >
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative h-auto overflow-hidden bg-slate-900/20 flex items-center justify-center p-4">
                        {posts[0].mainImage && (
                          <img
                            src={urlFor(posts[0].mainImage).url()}
                            alt={posts[0].title}
                            className="w-full h-auto max-h-[600px] object-contain group-hover:scale-105 transition-transform duration-700 shadow-2xl rounded-xl"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6 text-xs font-bold text-[var(--color-brand-purple-light)] uppercase tracking-widest">
                          <span className="px-2 py-1 bg-purple-500/10 rounded">
                            Featured Story
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-700" />
                          <span className="text-slate-500">
                            {new Date(posts[0].publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-bold mb-6 group-hover:text-[var(--color-brand-purple-light)] transition-colors leading-tight">
                          {posts[0].title}
                        </h2>

                        {/* Featured Categories */}
                        {posts[0].categories?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-8">
                            {posts[0].categories.map((cat: any) => (
                              <span
                                key={cat.slug}
                                className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-widest text-[var(--color-brand-purple-light)]"
                              >
                                {cat.title}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-slate-400 text-lg line-clamp-3 mb-8">
                          {posts[0].excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-[var(--color-brand-purple-light)] font-bold group-hover:translate-x-2 transition-transform">
                          Dive into the Story →
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Masonry Grid of Posts — distributed row-by-row for chronological order */}
                {(() => {
                  const items = posts.slice(
                    !year && !category && safeCurrentPage === 1 ? 1 : 0,
                  );
                  const colCount = 3;
                  const columns: any[][] = Array.from(
                    { length: colCount },
                    () => [],
                  );
                  items.forEach((post: any, i: number) => {
                    columns[i % colCount].push(post);
                  });

                  const renderCard = (post: any, index: number) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug.current}`}
                      className="masonry-item group block glass-panel rounded-2xl overflow-hidden hover-glow transition-all duration-300"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {post.mainImage && (
                        <div className="relative overflow-hidden bg-slate-900/20">
                          <img
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                          {post.publishedAt && (
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold mb-3 group-hover:text-[var(--color-brand-purple-light)] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-500 text-sm line-clamp-2 mb-6">
                          {post.excerpt}
                        </p>

                        {post.categories?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.categories.map((cat: any) => (
                              <span
                                key={cat.slug}
                                className="px-2 py-0.5 rounded-full bg-purple-500/5 border border-purple-500/10 text-[9px] font-bold uppercase tracking-wider text-[var(--color-brand-purple-light)]"
                              >
                                {cat.title}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="text-xs font-bold text-white/40 group-hover:text-[var(--color-brand-purple-light)] transition-colors">
                          READ STORY →
                        </div>
                      </div>
                    </Link>
                  );

                  return (
                    <div className="masonry-row-grid">
                      {columns.map((col, colIndex) => (
                        <div key={colIndex} className="masonry-column">
                          {col.map((post: any, rowIndex: number) => {
                            const globalIndex = rowIndex * colCount + colIndex;
                            return renderCard(post, globalIndex);
                          })}
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* Pagination */}
                {totalPages > 1 &&
                  (() => {
                    const buildPageUrl = (p: number) => {
                      const params = new URLSearchParams();
                      if (year) params.set("year", year);
                      if (category) params.set("category", category);
                      if (q) params.set("q", q);
                      if (p > 1) params.set("page", String(p));
                      const qs = params.toString();
                      return `/blog${qs ? `?${qs}` : ""}`;
                    };

                    // Generate visible page numbers
                    const pageNumbers: (number | "...")[] = [];
                    if (totalPages <= 7) {
                      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
                    } else {
                      pageNumbers.push(1);
                      if (safeCurrentPage > 3) pageNumbers.push("...");
                      for (
                        let i = Math.max(2, safeCurrentPage - 1);
                        i <= Math.min(totalPages - 1, safeCurrentPage + 1);
                        i++
                      ) {
                        pageNumbers.push(i);
                      }
                      if (safeCurrentPage < totalPages - 2)
                        pageNumbers.push("...");
                      pageNumbers.push(totalPages);
                    }

                    return (
                      <nav
                        className="flex items-center justify-center gap-2 pt-12"
                        aria-label="Blog pagination"
                      >
                        {/* Previous */}
                        {safeCurrentPage > 1 ? (
                          <Link
                            href={buildPageUrl(safeCurrentPage - 1)}
                            className="px-4 py-2 rounded-full glass-panel text-sm font-bold text-slate-400 hover:text-white hover-glow transition-all"
                          >
                            ← Prev
                          </Link>
                        ) : (
                          <span className="px-4 py-2 rounded-full text-sm font-bold text-slate-700 cursor-not-allowed">
                            ← Prev
                          </span>
                        )}

                        {/* Page Numbers */}
                        {pageNumbers.map((p, idx) =>
                          p === "..." ? (
                            <span
                              key={`ellipsis-${idx}`}
                              className="px-2 text-slate-600"
                            >
                              …
                            </span>
                          ) : (
                            <Link
                              key={p}
                              href={buildPageUrl(p)}
                              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                                p === safeCurrentPage
                                  ? "bg-[var(--color-brand-purple)] text-white shadow-lg shadow-purple-500/20"
                                  : "glass-panel text-slate-400 hover:text-white hover-glow"
                              }`}
                            >
                              {p}
                            </Link>
                          ),
                        )}

                        {/* Next */}
                        {safeCurrentPage < totalPages ? (
                          <Link
                            href={buildPageUrl(safeCurrentPage + 1)}
                            className="px-4 py-2 rounded-full glass-panel text-sm font-bold text-slate-400 hover:text-white hover-glow transition-all"
                          >
                            Next →
                          </Link>
                        ) : (
                          <span className="px-4 py-2 rounded-full text-sm font-bold text-slate-700 cursor-not-allowed">
                            Next →
                          </span>
                        )}
                      </nav>
                    );
                  })()}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-40 h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar pr-2 space-y-8 pb-12">
              <BlogSidebar
                years={years as string[]}
                currentYear={year}
                categories={categories}
                currentCategory={category}
              />
              <div className="glass-panel p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 gradient-text">
                  About the Chronicle
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Julie Morgan's blog has been a home for stories, updates, and
                  musings since 2013. Exploring themes of paranormal romance,
                  author life, and everything in between.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
