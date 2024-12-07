'use client'
import React, { useEffect } from 'react'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginButton() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <div className='flex gap-5'>
          <div className='relative bg-white'>
          <div className='bg-black w-full h-full absolute top-3 right-3 z-0'/>
          <Link
            href="/admin"
            className="flex px-6 py-1 border-solid border-2 border-black bg-white relative z-10 hover:top-1 hover:right-1 transition-transform duration-300 ease-out"
          >
            <div className='flex items-center gap-1 text-black bg-white'>
              <p className='text-2xl'>Admin Panel</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
            </div>
          </Link>
        </div>
        <div className='relative bg-white'>
          <div className='bg-black w-full h-full absolute top-3 right-3 z-0'/>
          <button
            onClick={() => signOut({ redirect: false }).then(() => router.push("/"))}
            className="flex px-6 py-1 border-solid border-2 border-black bg-white relative z-10 hover:top-1 hover:right-1 transition-transform duration-300 ease-out"
          >
            <div className='flex items-center gap-1 text-black bg-white'>
              <p className='text-2xl'>Log Out</p>
            </div>
          </button>
        </div>
        </div>
      );
    } else if (status === "loading") {
      return (
        <span className="text-[#888] text-sm mt-7">Loading...</span>
      )
    } else {
      return (
        <div className='relative bg-white'>
          <div className='bg-black w-full h-full absolute top-3 right-3 z-0'/>
          <Link
            href="/login"
            className="flex px-6 py-1 border-solid border-2 border-black bg-white relative z-10 hover:top-1 hover:right-1 transition-transform duration-300 ease-out"
          >
            <div className='flex items-center gap-1 text-black bg-white'>
              <p className='text-2xl'>Log In</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
            </div>
          </Link>
        </div>
      )
    }
  }

  return (
    <div className="">
      {showSession()}
    </div>
  )
}

export default LoginButton;