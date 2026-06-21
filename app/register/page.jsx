"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaTint } from "react-icons/fa";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation";

export default function Register() {
  const route = useRouter();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name, // 👈 store name here
        },
      }
    });

    if (error) {
      toast.error("Error occurs")
    } else {
      toast.success("registration successfull")
      setName("")
      setEmail("")
      setPassword("")
      route.push('/login')
    };
  };


  /* Login with Google */
  const googleloginhandler = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) toast.error(error.message);
  };
  return (

    <div className="h-[640] flex items-center justify-center bg-[url('/login-bg.jpg')] bg-center bg-cover px-4 ">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }} />
      <div className="bg-white shadow-xl rounded-2xl px-8 py-6 w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-1 m-1 ">
          <div className="bg-red-600 p-4 rounded-full">
            <Link href={"/"}><FaTint className="text-white text-2xl" /></Link>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-1">
          Join Blood Management System
        </p>

        {/* Register Form */}
        <form className="mt-5 space-y-4">

          <input
            type="text" onChange={(e) => setName(e.target.value)}
            placeholder="Full Name" value={name}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:border-red-500"
          />

          <input
            type="email" onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address" value={email}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:border-red-500"
          />

          <input
            type="password" onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" value={password}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:border-red-500"
          />

          <button
            type="submit" onClick={handleRegister}
            className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
          >
            Register
          </button>

        </form>


        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Signup */}
        <button onClick={googleloginhandler}
          className="w-full cursor-pointer border py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50"
        >
          <FcGoogle size={24} />
          Sign Up with Google
        </button>

        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-gray-600">
            Already have an account?
          </span>

          <Link
            href="/login"
            className="text-red-600 cursor-pointer font-semibold ml-2"
          >
            Login
          </Link>
        </div>

      </div>

    </div>
  );
}