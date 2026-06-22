"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaTint } from "react-icons/fa";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const userEmail = data?.user?.email;

    if (userEmail === "kay@gmail.com") {
      toast.success("Admin login successful");
      router.push("/admin");
    } else {
      toast.success("Login successful");
      router.push("/dashboard");
    }
  };

  /* Login with Google */
  const googleloginhandler = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://6a38eab778fb99f4bb253e01--chic-bavarois-4f4841.netlify.app/auth/callback",
      },
    });

    if (error) toast.error(error.message);
  };


  return (
   <div className="bg-[url('/login-bg.jpg')] bg-center bg-cover h-[640] flex items-center justify-center bg-gray-100 ">
   

      <div className="bg-white shadow-xl rounded-2xl px-8 py-3  max-w-md ">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-600 p-4 rounded-full">
            <Link href={"/"}><FaTint className="text-white text-2xl" /></Link>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to Blood Management System
        </p>

        {/* Form */}
        <form className="mt-8 space-y-4">

          <input
            type="email" onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:border-red-500"
          />

          <input
            type="password" onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:border-red-500"
          />

          <button
            type="submit" onClick={handleSubmit}
            className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
          >
            Login
          </button>

        </form>

        {/* Forgot Password */}
        <div className="text-right mt-3">
          <Link
            href="/forgot-password"
            className="text-red-600 text-sm cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">
            OR
          </span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button onClick={googleloginhandler}
          className="w-full border cursor-pointer py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50"
        >
          <FcGoogle size={25} />
          Continue with Google
        </button>

        {/* Register */}
        <div className="text-center mt-6">
          <span className="text-gray-600">
            Don't have an account?
          </span>

          <Link
            href="/register"
            className="text-red-600 font-semibold ml-2"
          >
            Register
          </Link>
        </div>

      </div>

    </div>
  );
}
