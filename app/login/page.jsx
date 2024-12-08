"use client";
// import React from 'react'
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import './login.css'

const Login = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
    });
    if (res?.error) {
        setError(res.error);
    }
    if (res?.ok) {
        return router.push("/");
    }
};
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Login to Your Account
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. admin@work.com or tutor@work.com"
            required
            className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="e.g. password or work"
            required
            className="w-full mt-1 p-2 bg-white border border-gray-300 rounded-md text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
    // <section className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <form
    //     className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
    //     onSubmit={handleLogin}
    //   >
    //     {error && <div className="text-red-500 mb-4">{error}</div>}
    //     <h1 className="mb-2 text-center w-full text-4xl font-meidum text-slate-700">Sign In</h1>
    //     <label className="text-slate-700 w-full text-sm mb-2">Email</label>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       className="text-black w-full h-10 border border-solid border-gray-300 rounded p-2 mb-4 bg-white"
    //       name="email"
    //     />
    //     <label className="text-slate-700 w-full text-sm mb-2">Password</label>
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       className="text-black w-full h-10 border border-solid border-gray-300 rounded p-2 mb-4 bg-white"
    //       name="password"
    //     />
    //     <button className="w-full bg-black text-white text-2xl h-10 rounded mb-4 hover:scale-[1.01] transition-transform ease-out ">
    //       Log In
    //     </button>
    //     <Link
    //       href="/register"
    //       className="text-sm text-gray-500 transition duration-150 ease hover:text-black"
    //     >
    //       Don't have an account?
    //     </Link>
    //   </form>
    // </section>
  );
}

export default Login
