"use client";

import TButton from "@/components/ui/TButton";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="mb-4 text-3xl font-semibold text-red-600">Oops! Something went wrong</h2>
        <p className="mb-6 text-gray-700">
          An unexpected error has occurred. Please try again later or click the button below to
          retry.
        </p>
        <TButton className="bg-red-600" color="danger" onClick={() => reset()}>
          Try again
        </TButton>
      </div>
    </div>
  );
}
