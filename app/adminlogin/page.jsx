"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaTint } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("auth_id", user.id)
      .single();

    if (profileError) {
      toast.error("Profile not found");
      setLoading(false);
      return;
    }

    toast.success("Login successful");

    if (profile.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <div className="h-[640] flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">

      {/* Background Blur Circle */}
      <div className="absolute w-96 h-96 bg-red-300/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-red-500/10 rounded-full blur-3xl bottom-10 right-10"></div>

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-red-100">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-red-600 p-4 rounded-full shadow-lg">
              <FaTint className="text-white text-3xl" />
            </div>

            <h1 className="text-3xl font-bold text-red-600 mt-4">
              Blood Management
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Admin Login Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-red-500">
                <FaEnvelope className="text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-red-500">
                <FaLock className="text-gray-400 mr-3" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-red-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-red-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Blood Management System © 2026
          </div>

        </div>
      </div>
    </div>
  );
}