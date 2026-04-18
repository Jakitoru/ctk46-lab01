"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Lỗi copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
        copied
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {copied ? "Đã copy!" : "Copy link"}
    </button>
  );
}
