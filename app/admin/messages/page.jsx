"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [viewMessage, setViewMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setMessages(data);
    }
  };

  // 🔍 SEARCH
  const filtered = messages.filter((m) => {
    const key = search.toLowerCase();
    return (
      m.name?.toLowerCase().includes(key) ||
      m.email?.toLowerCase().includes(key) ||
      m.subject?.toLowerCase().includes(key)
    );
  });

  // 🗑 DELETE
  const deleteMessage = async () => {
    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", deleteId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Message deleted");
      fetchMessages();
    }

    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Contact Messages
      </h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by name, email or subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg shadow mb-4"
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Message</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((m) => (
                <tr key={m.id} className="border-b hover:bg-gray-50">

                  <td className="p-3 font-semibold">{m.name}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3">{m.subject}</td>

                  <td className="p-3 max-w-xs truncate text-gray-600">
                    {m.message}
                  </td>

                  <td className="p-3 text-sm text-gray-500">
                    {new Date(m.created_at).toLocaleString()}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => setViewMessage(m)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() => setDeleteId(m.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No messages found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* 👁 VIEW MODAL */}
      {viewMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg">

            <h2 className="text-xl font-bold text-red-600 mb-4">
              Message Details
            </h2>

            <div className="space-y-2 text-gray-700">

              <p><strong>Name:</strong> {viewMessage.name}</p>
              <p><strong>Email:</strong> {viewMessage.email}</p>
              <p><strong>Subject:</strong> {viewMessage.subject}</p>

              <div>
                <strong>Message:</strong>
                <p className="mt-2 bg-gray-100 p-3 rounded">
                  {viewMessage.message}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                {new Date(viewMessage.created_at).toLocaleString()}
              </p>

            </div>

            <button
              onClick={() => setViewMessage(null)}
              className="mt-5 bg-red-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* 🧨 DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center">

            <h2 className="text-xl font-bold">
              ⚠️ Delete Message?
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
                onClick={deleteMessage}
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