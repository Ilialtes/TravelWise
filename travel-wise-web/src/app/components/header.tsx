'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div className="w-full bg-teal-600 backdrop-blur-lg text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 hover:scale-105 transition-transform">
            <Image
              src="/travelwise Background Removed.png"
              alt="Travel Wise Logo"
              width={40}
              height={40}
              className="mr-2 hover:scale-105 transition-transform"
            />
            <Link href="/" className="text-3xl font-bold tracking-wide">
              TravelWise
            </Link>
          </div>
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/"
            className="hover:underline text-lg hover:scale-105 transition-transform font-bold"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:underline text-lg hover:scale-105 transition-transform font-bold"
          >
            About
          </Link>
          {user ? (
            <button
              onClick={handleSignOut}
              className="hover:underline text-lg hover:scale-105 transition-transform font-bold"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="hover:underline text-lg font-bold">
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
