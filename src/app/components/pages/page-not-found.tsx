 'use client'
  import FormButton from "../ui/button";
import { useRouter } from "next/navigation";

export default function PageNotFound() {
    const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          404
        </h1>
        <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-8">
          Oops! Page not found
        </p>
        <div className="mb-8">
          <svg
            className="w-64 h-64 mx-auto text-gray-400 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
       
          <FormButton   text="Back to Home" onClick={() => {router.push('/')}}  />
           
       </div>
    </div>
  );
}
