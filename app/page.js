'use client';
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import UpdateArticle from "@/components/form/UpdateArticle";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <main>
        <Navbar />
        
      
    </main>
  )
}
