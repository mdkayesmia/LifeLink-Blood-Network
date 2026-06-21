"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import {
  FaChartPie,
  FaUsers,
  FaTint,
  FaFileMedical,
  FaHospital,
  FaUserShield,
  FaEnvelope,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router=useRouter()
  const [open, setOpen] = useState(false);

  const menus = [
    { name: "Dashboard", path: "/admin",key:1, icon: <FaChartPie /> },
    { name: "Donors", path: "/admin/donors",key:2, icon: <FaUsers /> },
    { name: "Requests", path: "/admin/request",key:3, icon: <FaFileMedical /> },
    { name: "Users", path: "/admin/users",key:4, icon:<FaUserShield /> },
    { name: "Messages", path: "/admin/messages",key:5, icon: <FaEnvelope /> },
    { name: "Notifications", path: "",key:6, icon: <FaBell /> },
    { name: "Settings", path: "", key:7,icon: <FaCog /> },
  ];

    // LOGOUT
  // ======================
  const logouthandler = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <div className="">
        {/* MOBILE FLOAT BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 bg-white shadow-md p-3 rounded-xl md:hidden"
      >
        <FaBars />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 h-full bg-white border-r shadow-lg
          transition-transform duration-300
          w-15 md:w-50
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* CLOSE BUTTON (mobile) */}
        <div className="md:hidden flex justify-end p-3">
          <button onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* ================= HEADER ================= */}
        <div className="flex flex-col items-center justify-center py-2 border-b">
          <div className="text-red-600 text-2xl font-bold">
            🩸
          </div>

          {/* Only show text on desktop */}
          <h1 className="hidden md:block text-xl font-bold text-red-600">
            Blood Admin
          </h1>

          <p className="hidden md:block text-xs text-gray-500">
            Management System
          </p>
        </div>

        {/* ================= MENU ================= */}
        <div className="p-2 space-y-2">
          {menus.map((menu) => (
            <Link
              key={menu.key}
              href={menu.path}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-center md:justify-start gap-3 p-3 rounded-xl transition
                ${
                  pathname === menu.path
                    ? "bg-red-50 text-red-600"
                    : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                }
              `}
            >
              <span className="text-lg">{menu.icon}</span>

              {/* hide text on mobile */}
              <span className="hidden md:inline">{menu.name}</span>
            </Link>
          ))}

          {/* ================= LOGOUT ================= */}
          <button
            onClick={logouthandler}
            className="w-full cursor-pointer flex items-center justify-center md:justify-start gap-3 p-3 text-red-500 hover:text-red-600"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </aside>
      </div>
    </>
  );
}