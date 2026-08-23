export const metadata = {
  title: "Sanity Studio",
  description: "Manage your blog content",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
