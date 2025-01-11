import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <div className="w-full bg-teal-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Travel Wise</h1>
          <nav className="flex gap-4">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/login" className="hover:underline">Login</Link>
          </nav>
        </div>
      </div>
    );
  };

  export default Header;
