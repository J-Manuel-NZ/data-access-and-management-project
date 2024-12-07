'use client'
import React from 'react'
import './navbar.css'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginButton from '../login/LoginButton';
import Image from 'next/image';

function Navbar() {
  return (
    <div className='flex w-full items-center justify-center between mt-20 px-32 '>
      <div className='flex w-full justify-between items-center'>
        <Image src='/whitecliffe-logo.png' alt='logo' width={400} height={100}/>
        <LoginButton />
      </div>
    </div>
  )
}

export default Navbar
