import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";

type Stotra = {
  title: string;
  url: string;
  content: string;
};

export default async function StotraPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "public", "data", "stotras.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const { posts }: { posts: Stotra[] } = JSON.parse(jsonData);

  const post = posts.find(p => p.url === params.slug);

  if (!post) return notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">{post.title}</h1>
      <pre className="whitespace-pre-wrap leading-relaxed text-lg">
        {post.content}
      </pre>
    </div>
  );
}
