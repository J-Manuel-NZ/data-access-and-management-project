'use client'
import React, { use, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const AdminLayout = ({ children }) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [selectedMenuItem, setSelectedMenuItem] = useState("Add Article");
    const menuItems = ["Add Article", "Edit Articles"];

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, session]);

    useEffect(() => {
        router.push(`/admin/${selectedMenuItem.toLowerCase().replace(" ", "-")}`);
    }, [selectedMenuItem]);

    if (status === "loading" || status === "unauthenticated") {
        return <div>Loading Admin Panel...</div>;
    }

  return (
    <main className="flex h-screen">
      <div className="w-1/4 max-w-72"/>
      <nav className="w-1/4 max-w-72 bg-gray-800 text-white p-4 h-full flex items-center fixed">
        <h1 className="text-3xl font-semibold text-white mb-2 absolute top-4">Admin Panel</h1>
      
        <ul className="space-y-4 w-full">
            {menuItems.map((item, indx) => (
                <li key={indx} className={`hover:bg-gray-700 p-2 rounded w-full cursor-pointer ${selectedMenuItem === item ? "bg-gray-700" : ""}`}
                onClick={() => setSelectedMenuItem(item)}>{item}</li>
            ))
            }
          <li className="hover:bg-gray-700 p-2 rounded w-full cursor-pointer"
          onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/");
                });
              }} >Log Out</li>
        </ul>
      </nav>
      <div className="w-3/4 bg-gray-100">
      <div className="p-4 w-full border-b-2 border-gray-300 mb-12">
        <div className="flex items-center gap-2">
          <p className="text-xl text-gray-600">Welcome, {session.user.name}</p>
        </div>
      </div>
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
