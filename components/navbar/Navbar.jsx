"use client"
import React from 'react'
import './navbar.css'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  
  const { status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          className="border border-solid border-black rounded"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Sign Out
        </button>
      )
    } else if (status === "loading") {
      return (
        <span className="text-[#888] text-sm mt-7">Loading...</span>
      )
    } else {
      return (
        <Link
          href="/login"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      )
    }
  }

  return (
    <div className='navbar'>
      <div className='navbar_search-bar'>
        <input type="text" />
        <button>Search</button>
      </div>
      <div className="login">
        {/* <button>Login</button> */}
        {showSession()}
      </div>
    </div>
  )
}

export default Navbar
