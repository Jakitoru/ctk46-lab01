"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function PokemonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi!</h2>
      <p className="text-gray-600 mb-8">Không thể tải dữ liệu Pokémon từ API.</p>
      <Button onClick={() => reset()} variant="outline">
        Thử lại
      </Button>
    </div>
  );
}
