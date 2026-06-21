"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  FaTint,
  FaUsers,
  FaEnvelope,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    requests: 0,
    donors: 0,
    contacts: 0,
    emergencies: 0,
  });

  const [requests, setRequests] = useState([]);
  const [contacts, setContacts] = useState([]);

  // ---------------- ROLE CHECK ----------------
  const checkRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/adminlogin");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("auth_id", user.id)
      .single();

    if (error || !data) {
      router.push("/adminlogin");
      return;
    }

    if (data.role === "admin") {
      router.push("/admin");
      return;
    }else{
        router.push("/adminlogin")
    }
  };

  // ---------------- FETCH DATA ----------------
  const fetchAll = async () => {
    const { data: req } = await supabase.from("blood_requests").select("*");
    const { data: donors } = await supabase.from("donors").select("*");
    const { data: contacts } = await supabase.from("contacts").select("*");

    setStats({
      requests: req?.length || 0,
      donors: donors?.length || 0,
      contacts: contacts?.length || 0,
      emergencies: req?.filter((r) => r.emergency).length || 0,
    });

    setRequests(req || []);
    setContacts(contacts || []);
  };

  // ---------------- INIT ----------------
  useEffect(() => {
    const init = async () => {
      await checkRole();
      await fetchAll();
      setLoading(false);
    };

    init();
  }, []);

  // ---------------- LOADING UI ----------------
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  // ---------------- ANIMATION ----------------
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // ---------------- CHART DATA ----------------
  const statusData = [
    {
      name: "Pending",
      value: requests.filter((r) => r.status === "Pending").length,
    },
    {
      name: "Approved",
      value: requests.filter((r) => r.status === "Approved").length,
    },
    {
      name: "Rejected",
      value: requests.filter((r) => r.status === "Rejected").length,
    },
  ];

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];

  const activityData = [
    { name: "Requests", value: stats.requests },
    { name: "Donors", value: stats.donors },
    { name: "Messages", value: stats.contacts },
  ];

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gray-100 px-6">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-red-600 mb-6 text-center"
      >
        Admin Dashboard
      </motion.h1>

      {/* STATS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {[
          {
            icon: <FaTint />,
            label: "Blood Requests",
            value: stats.requests,
            color: "text-red-600",
          },
          {
            icon: <FaUsers />,
            label: "Donors",
            value: stats.donors,
            color: "text-blue-600",
          },
          {
            icon: <FaEnvelope />,
            label: "Messages",
            value: stats.contacts,
            color: "text-green-600",
          },
          {
            icon: <FaExclamationTriangle />,
            label: "Emergencies",
            value: stats.emergencies,
            color: "text-yellow-500",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow"
          >
            <div className={`${item.color} text-4xl mb-3`}>
              {item.icon}
            </div>
            <h2 className="text-2xl font-bold">{item.value}</h2>
            <p>{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Request Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Activity Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* RECENT REQUESTS */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold mb-4">
          Recent Requests
        </h2>

        <div className="space-y-3">
          {requests.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex justify-between border p-3 rounded"
            >
              <span>{item.patient_name}</span>
              <span>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT MESSAGES */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Recent Messages
        </h2>

        <div className="space-y-3">
          {contacts.slice(0, 5).map((item) => (
            <div key={item.id} className="border p-3 rounded">
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.subject}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}