"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/signup");
  }, [router]);

  return null; // Render nothing since it's just a redirect
};

export default HomePage;
