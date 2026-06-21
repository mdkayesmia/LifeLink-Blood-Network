"use client";

import { useState } from "react";
import Navbar from "./../../../components/Navbar";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTint,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function DonorRegisterForm() {
      const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    blood_group: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { error } = await supabase.from("donors").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          blood_group: formData.blood_group,
          address: formData.address,
        },
      ]);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Donor registered successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        blood_group: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  {/* Logout function */}
    const logouthandler = () => {
    router.push("/");
  };

  return (
    <div className="">
      <Toaster position="top-right" />

      <div className="bg-[url('/login-bg.jpg')] bg-cover bg-center h-[640] flex items-center justify-center bg-gray-100 px-4 py-2">
        
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg">
          <div className="flex items-baseline-last justify-between">
            <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
            Donor Registration 
          </h2>
          <button onClick={logouthandler}><FiLogOut className="text-lg text-red-500" /></button>
          </div>
          


          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="flex items-center border rounded-lg px-3 py-3">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border rounded-lg px-3 py-3">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full outline-none"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center border rounded-lg px-3 py-3">
              <FaPhone className="text-gray-500 mr-3" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full outline-none"
              />
            </div>

            {/* Blood Group */}
            <div className="flex items-center border rounded-lg px-3 py-3">
              <FaTint className="text-red-500 mr-3" />
              <select
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Address */}
            <div className="flex items-center border rounded-lg px-3 py-3">
              <FaMapMarkerAlt className="text-gray-500 mr-3" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="w-full outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register as Donor"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}