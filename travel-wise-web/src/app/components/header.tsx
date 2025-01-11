"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="w-full bg-teal-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">Travel Wise</h1>
        <nav className="flex gap-6">
          <Link href="/" className="hover:underline text-lg">Dashboard</Link>
          <Link href="/about" className="hover:underline text-lg">About</Link>
          {user ? (
            <button onClick={handleSignOut} className="hover:underline text-lg">Sign Out</button>
          ) : (
            <Link href="/login" className="hover:underline text-lg">Login</Link>
          )}
        </nav>
      </div>
    </div>
  );
};

  export default Header;
