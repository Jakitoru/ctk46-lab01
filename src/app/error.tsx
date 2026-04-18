"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-red-50 p-8 rounded-2xl border border-red-100 max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Hệ thống gặp sự cố!
        </h2>
        <p className="text-gray-600 mb-8">
          Chúng tôi rất tiếc vì sự cố này. Vui lòng thử tải lại trang hoặc quay lại sau.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Thử lại
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-white border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
