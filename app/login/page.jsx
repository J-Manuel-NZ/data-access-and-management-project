"use client";
// import React from 'react'
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import './login.css'

const Login = () => {
  const [error, setError] = useState("");
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
    <section className="login-container">
      <form
        className="login-form"
        onSubmit={handleLogin}>
        {error && <div className="text-black">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
        <label className="w-full text-sm">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-black rounded p-2"
          name="email" />
        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-black rounded p-2"
            name="password" />
        </div>
        <button className="w-full border border-solid border-black rounded">
          Sign In
        </button>

        <Link
          href="/register"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black">
          Don't have an account?
        </Link>
      </form>
    </section>
);
}

export default Login
