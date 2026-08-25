import type { Metadata } from "next";
import { PageHeader } from "@/app/components/page-header";
import { BlogContent } from "@/app/blog/blog-content";

export const metadata: Metadata = {
  title: "Blog - Golin",
  description:
    "Tips main, panduan booking, dan update seputar mini soccer dari tim Golin.",
};

export default function BlogPage() {
  return (
    <main className="min-h-svh bg-white px-9 pt-28 pb-16 sm:px-14 sm:pt-36 sm:pb-20">
      <PageHeader
        eyebrow="Blog"
        title="Tips main, update venue, dan cerita seputar mini soccer"
        description="Kumpulan artikel dari tim Golin buat nemenin kamu sebelum dan sesudah main."
      />
      <BlogContent />
    </main>
  );
}
