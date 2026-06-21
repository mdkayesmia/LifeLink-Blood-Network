"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminBloodRequests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("blood_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setRequests(data);
    }
  };

  // 🔍 SEARCH FILTER
  const filtered = requests.filter((r) => {
    const key = search.toLowerCase();
    return (
      r.patient_name?.toLowerCase().includes(key) ||
      r.phone?.toLowerCase().includes(key) ||
      r.hospital?.toLowerCase().includes(key)
    );
  });

  // 🟡 STATUS UPDATE
  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("blood_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Marked as ${status}`);
      fetchRequests();
    }
  };

  // 🗑 DELETE
  const deleteRequest = async () => {
    const { error } = await supabase
      .from("blood_requests")
      .delete()
      .eq("id", deleteId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Request deleted");
      fetchRequests();
    }

    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Blood Request Management
      </h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by patient, phone, hospital..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg shadow mb-4"
      />

      {/* 📊 TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3">Patient</th>
              <th className="p-3">Blood</th>
              <th className="p-3">Units</th>
              <th className="p-3">Hospital</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">

                  <td className="p-3 font-semibold">
                    {r.patient_name}
                  </td>

                  <td className="p-3 text-red-600 font-bold">
                    {r.blood_group}
                  </td>

                  <td className="p-3">{r.units}</td>

                  <td className="p-3">{r.hospital}</td>

                  <td className="p-3">{r.phone}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        r.status === "Approved"
                          ? "bg-green-500"
                          : r.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        updateStatus(r.id, "Approved")
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(r.id, "Pending")
                      }
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Pending
                    </button>

                    <button
                      onClick={() => setDeleteId(r.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-4 text-gray-500"
                >
                  No requests found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* 🧨 DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">

            <h2 className="text-xl font-bold">
              ⚠️ Delete Request?
            </h2>

            <p className="text-gray-500 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4 mt-6">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={deleteRequest}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}