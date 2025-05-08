import Link from "next/link";
import React from "react";
import DashLogo from "../../../../public/assets/icons/DashLogo";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-white flex flex-col">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center">
        <div>
          <DashLogo width="272" height="95" />
        </div>

        <div className="flex items-center space-x-4 text-gray-700">
          <Link
            className=" underline  hover:text-theme-blue"
            href="/auth/create-account"
          >
            Create-account
          </Link>
          <Link className=" underline  hover:text-theme-blue" href="/dashboard">
            Dashboard
          </Link>
          <Link
            className=" underline  hover:text-theme-blue"
            href="/product-sourcing"
          >
            Product-sourcing
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 text-transparent bg-clip-text">
          Coming Soon
        </h1>

        <p className="text-gray-400 mb-12 text-lg">
          One Stop Shop for All Your one-stop shop for all your needs
        </p>

        <p className="text-gray-500 text-sm">
          ― This page will be launched soon ―
        </p>
      </main>

      {/* Footer */}
    </div>
  );
};

export default ComingSoonPage;
