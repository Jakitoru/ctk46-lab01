import { NextRequest, NextResponse } from "next/server";
import { guestbookEntries } from "@/data/guestbook";

// GET /api/guestbook — Lấy danh sách tất cả lời nhắn
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  
  let data = [...guestbookEntries];
  if (limit) {
    data = data.slice(0, parseInt(limit));
  }
  
  return NextResponse.json(data);
}

// POST /api/guestbook — Thêm lời nhắn mới
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Kiểm tra dữ liệu đầu vào (Phần 2 Bài tập tự làm)
  if (!body.name || body.name.length < 2 || body.name.length > 50) {
    return NextResponse.json(
      { error: "Tên phải từ 2-50 ký tự" },
      { status: 400 }
    );
  }
  if (!body.message || body.message.length < 1 || body.message.length > 500) {
    return NextResponse.json(
      { error: "Lời nhắn phải từ 1-500 ký tự" },
      { status: 400 }
    );
  }


  // Tạo entry mới
  const newEntry = {
    id: Date.now().toString(),
    name: body.name,
    message: body.message,
    createdAt: new Date().toISOString(),
  };

  // Thêm vào đầu mảng (hiển thị mới nhất trước)
  guestbookEntries.unshift(newEntry);

  return NextResponse.json(newEntry, { status: 201 });
}
