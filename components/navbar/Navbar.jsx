"use client"
import React from 'react'
import './navbar.css'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginButton from '../login/LoginButton';

function Navbar() {
  
  const { data: session, status } = useSession();
  const router = useRouter();


  return (
    <div className='navbar'>
      <div className='navbar_search-bar'>
        <input type="text" />
        <button>Search</button>
      </div>
      <LoginButton />
    </div>
  )
}

export default Navbar
