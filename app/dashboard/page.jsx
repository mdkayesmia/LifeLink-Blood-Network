"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaTint, FaSearch, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  // ======================
  // CHECK AUTH USER
  // ======================
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!data?.user || error) {
        router.push("/login");
        return;
      }

      setUser(data.user);
    };

    checkUser();
  }, []);

  // ======================
  // FETCH DONORS
  // ======================
  useEffect(() => {
    const fetchDonors = async () => {
      const { data, error } = await supabase
        .from("donors")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load donors");
      } else {
        setDonors(data);
      }
    };

    fetchDonors();
  }, []);

  // ======================
  // LOGOUT
  // ======================
  const logouthandler = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    router.push("/");
  };

  // ======================
  // SEARCH FILTER
  // ======================
  const filteredDonors = donors.filter((d) =>
    `${d.blood_group} ${d.address}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="bg-white  p-2 rounded-xl shadow mb-6 flex justify-between items-center">
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-red-600">
            🩸 Blood Donor Dashboard
          </h1>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow  max-w-xl mx-auto">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="search group, location"
            className="w-full outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <div className="flex items-center gap-1 ">
          <div className="hidden md:block" >
            <p className="font-bold  text-green-800">{user?.user_metadata?.name}</p>
          </div>
          <FaUserCircle className="text-3xl text-green-500 hidden md:block" />
          <div className="flex flex-row">
            <button
              onClick={logouthandler}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              <FiLogOut className="text-lg" />

            </button>
          </div>

        </div>


      </div>

      {/* SEARCH */}


      {/* DONOR LIST */}
      <div className="overflow-x-auto bg-white rounded-xl shadow ">
        <table className="w-full border-collapse ">
          <thead>
            <tr className="bg-red-600 text-white ">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Blood Group</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <tr
                  key={donor.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{donor.name}</td>
                  <td className="p-3">{donor.email}</td>
                  <td className="p-3">{donor.phone}</td>
                  <td className="p-3">
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded font-semibold">
                      {donor.blood_group}
                    </span>
                  </td>
                  <td className="p-3">{donor.address}</td>
                  <td className="p-3">
                    <a
                      href={`https://wa.me/${donor.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No donors found 😢
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;