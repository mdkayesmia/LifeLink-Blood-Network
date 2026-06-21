"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setUsers(data);
    }
  };

  // 🔍 SEARCH
  const filtered = users.filter((u) => {
    const key = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(key) ||
      u.email?.toLowerCase().includes(key) ||
      u.role?.toLowerCase().includes(key)
    );
  });

  // 🔄 CHANGE ROLE
  const changeRole = async (id, role) => {
    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Role updated to ${role}`);
      fetchUsers();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Users Management
      </h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by name, email or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg shadow mb-4"
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-center">

          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">

                

                  <td className="p-3">{u.email}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        u.role === "admin"
                          ? "bg-green-600"
                          : "bg-blue-500"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-3 text-sm text-gray-500">
                    {new Date(u.created_at).toLocaleString()}
                  </td>

                  <td className="p-3 flex gap-2 justify-center">

                    <button
                      onClick={() => changeRole(u.id, "admin")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Make Admin
                    </button>

                    <button
                      onClick={() => changeRole(u.id, "user")}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Make User
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
}