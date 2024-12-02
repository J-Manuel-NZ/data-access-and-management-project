"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import './register.css';
import { register } from "@/actions/register";

const Register = () => {
    
  const [error, setError] = useState();
  const router = useRouter();
  const ref = useRef(null); 
    
  const handleSignUp = async (formData) => {
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
      role: formData.get("role"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push("/login");
    }
  }; 
  
  return(
    <section className="register-container">
          <form ref = {ref}
            action={handleSignUp}
            className="register-form">
            {error && <div className="">{error}</div>}
            <h1 className="mb-5 w-full text-2xl font-bold">Register</h1>
    
            <label className="w-full text-sm">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
              name="name"
            />
    
            <label className="w-full text-sm">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
              name="email"
            />
    
            <label className="w-full text-sm">Password</label>
            <div className="flex w-full">
              <input
                type="password"
                placeholder="Password"
                className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
                name="password"
              />
            </div>
            <label className="w-full text-sm">Role</label>
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Tutor or Admin"
                className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
                name="role"
                required
              />
            </div>
    
            <button className="w-full border border-solid border-black py-1.5 mt-2.5 rounded
            transition duration-150 ease hover:bg-black">
              Sign up
            </button>
    
            
            <Link href="/login" className="text-sm text-[#888] transition duration-150 ease hover:text-black">
              Already have an account?
              </Link>
          </form>
    </section>
    )
}

export default Register;
