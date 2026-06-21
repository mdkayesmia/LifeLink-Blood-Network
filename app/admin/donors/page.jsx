"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminDonorsPage() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    blood_group: "",
    address: "",
  });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const { data, error } = await supabase
      .from("donors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setDonors(data);
    }
  };

  // 🔍 SEARCH FILTER
  const filteredDonors = donors.filter((donor) => {
    const keyword = search.toLowerCase();

    return (
      donor.name?.toLowerCase().includes(keyword) ||
      donor.email?.toLowerCase().includes(keyword) ||
      donor.phone?.toLowerCase().includes(keyword)
    );
  });

  // ✏️ EDIT
  const startEdit = (donor) => {
    setEditingId(donor.id);
    setForm({
      name: donor.name,
      email: donor.email,
      phone: donor.phone,
      blood_group: donor.blood_group,
      address: donor.address,
    });
  };

  const updateDonor = async () => {
    const { error } = await supabase
      .from("donors")
      .update(form)
      .eq("id", editingId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Donor updated");
      setEditingId(null);
      fetchDonors();
    }
  };

  // 🗑 OPEN DELETE MODAL
  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  // 🗑 DELETE ACTION
  const deleteDonor = async () => {
    const { error } = await supabase
      .from("donors")
      .delete()
      .eq("id", deleteId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Donor deleted successfully");
      fetchDonors();
    }

    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Admin Donor Management
      </h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by name, email or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg shadow mb-4"
      />

      {/* ✏️ EDIT FORM */}
      {editingId && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Edit Donor</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="border p-2 rounded"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              className="border p-2 rounded"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              className="border p-2 rounded"
              placeholder="Blood Group"
              value={form.blood_group}
              onChange={(e) =>
                setForm({ ...form, blood_group: e.target.value })
              }
            />

            <input
              className="border p-2 rounded"
              placeholder="Address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={updateDonor}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>

            <button
              onClick={() => setEditingId(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* 📊 TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto ">
        <table className="w-full text-left">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Address</th>
              <th className="p-3">Actions</th>
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
                  <td className="p-3 font-bold text-red-600">
                    {donor.blood_group}
                  </td>
                  <td className="p-3">{donor.address}</td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => startEdit(donor)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => confirmDelete(donor.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-4 text-gray-500"
                >
                  No donors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🧨 DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">

            <h2 className="text-xl font-bold text-gray-800">
              ⚠️ Confirm Delete
            </h2>

            <p className="text-gray-500 mt-2">
              Are you sure you want to delete this donor? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4 mt-6">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={deleteDonor}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}