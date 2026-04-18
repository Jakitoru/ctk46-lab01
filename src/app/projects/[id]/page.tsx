import Link from "next/link";
import { notFound } from "next/navigation";

// In a real app, this would come from a database or shared data file
const projects = [
  {
    slug: "website-portfolio",
    title: "Website Portfolio",
    description: "Website cá nhân xây dựng bằng Next.JS và Tailwind CSS",
    content: "Đây là dự án portfolio cá nhân của tôi, được xây dựng bằng Next.js App Router và Tailwind CSS. Trang web bao gồm các thành phần như Navbar, Footer, và các trang Giới thiệu, Dự án, Blog.",
    tech: ["Next.JS", "Tailwind CSS", "TypeScript"],
    status: "Đang phát triển",
  },
  {
    slug: "quan-ly-cong-viec",
    title: "Ứng dụng Quản lý Công việc",
    description: "Ứng dụng Todo App với React và Local Storage",
    content: "Ứng dụng giúp người dùng quản lý các tác vụ hàng ngày. Các tính năng bao gồm thêm, sửa, xóa tác vụ và đánh dấu hoàn thành. Dữ liệu được lưu trữ cục bộ trong trình duyệt.",
    tech: ["React", "CSS Modules", "JavaScript"],
    status: "Hoàn thành",
  },
  {
    slug: "api-restful",
    title: "API RESTful",
    description: "API quản lý sản phẩm với Node.js và Express",
    content: "Một hệ thống API backend mạnh mẽ để quản lý danh mục sản phẩm. Hỗ trợ đầy đủ các thao tác CRUD và xác thực người dùng.",
    tech: ["Node.js", "Express", "MongoDB"],
    status: "Hoàn thành",
  },
  {
    slug: "chat-realtime",
    title: "Chat Realtime",
    description: "Ứng dụng chat realtime với Socket.IO",
    content: "Ứng dụng trò chuyện trực tuyến cho phép nhiều người dùng kết nối và nhắn tin cho nhau trong thời gian thực.",
    tech: ["React", "Socket.IO", "Node.js"],
    status: "Đang phát triển",
  },
];

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.slug === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/projects"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Quay lại danh sách dự án
      </Link>
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <p className="text-gray-600 text-lg">{project.description}</p>
          </div>
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-medium self-start ${
              project.status === "Hoàn thành"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {project.status}
          </span>
        </div>

        <div className="prose max-w-none text-gray-700 mb-8">
          <h2 className="text-xl font-semibold mb-4">Chi tiết dự án</h2>
          <p>{project.content}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Công nghệ sử dụng</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-lg text-sm font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.slug,
  }));
}
