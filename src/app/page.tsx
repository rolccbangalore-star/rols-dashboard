import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to ROLS Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your account and explore features with ease.
      </p>

      {/* Secondary outline button with strong contrast */}
      <Link
        href="/login"
        className="px-6 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg 
                   hover:bg-blue-700 hover:text-white transition shadow-sm hover:shadow-md"
      >
        Proceed to Login
      </Link>
    </div>
  );
}
