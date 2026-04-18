import Link from "next/link";
import { notFound } from "next/navigation";
import { Post, User } from "@/types/post";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) notFound();
  return res.json();
}

async function getUser(userId: number): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!res.ok) throw new Error("Không thể tải thông tin tác giả");
  return res.json();
}

async function getComments(postId: string): Promise<any[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  if (!res.ok) return [];
  return res.json();
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  
  // Fetch post, author, and comments in parallel
  const post = await getPost(id);
  const [author, comments] = await Promise.all([
    getUser(post.userId),
    getComments(id)
  ]);

  return (
    <div>
      <Link
        href="/blog"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Quay lại danh sách
      </Link>

      <article>
        <h1 className="text-3xl font-bold mb-4 capitalize">{post.title}</h1>
        
        <div className="flex items-center gap-3 mb-6 text-sm text-gray-500">
          <span>Tác giả: <strong className="text-gray-700">{author.name}</strong></span>
          <span>•</span>
          <span>{author.email}</span>
        </div>

        <div className="prose max-w-none text-gray-700 whitespace-pre-line mb-12 leading-relaxed">
          {post.body}
        </div>

        <div className="border-t pt-8 mb-12">
          <h3 className="text-xl font-bold mb-6">Bình luận ({comments.length})</h3>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">{comment.name}</span>
                  <span className="text-xs text-gray-400">{comment.email}</span>
                </div>
                <p className="text-gray-600 text-sm">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Về tác giả</h3>
          <p className="text-gray-600 text-sm">
            <strong>{author.name}</strong> (@{author.username}) — {author.company.name}
          </p>
          <p className="text-gray-500 text-sm">{author.company.catchPhrase}</p>
        </div>
      </article>
    </div>
  );
}


