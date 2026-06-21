"use client";

import { useState } from "react";
import Link from "next/link";
import { FaTint, FaUser, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Blood Request", href: "/request" },
    { name: "Blood", href: "/dashboard" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "News", href: "/news" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-full">
            <FaTint className="text-white" />
          </div>

          <div>
            <h2 className="font-bold text-red-600 text-xl">BLOOD</h2>
            <p className="text-gray-500 text-sm hidden sm:block">
              MANAGEMENT SYSTEM
            </p>
          </div>
        </div>

        {/* ================= MEDIUM + LARGE MENU ================= */}
        <ul className="hidden md:flex flex-1 justify-center gap-4 lg:gap-8 font-medium text-sm lg:text-base">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="hover:text-red-600">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login (md + lg) */}
        <Link href="/login" className="hidden md:flex">
          <button className="bg-red-600 text-white px-4 lg:px-6 py-2 rounded-full flex items-center gap-2">
            <FaUser />
            Login
          </button>
        </Link>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white shadow ${
          open ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 font-medium">

          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Link href="/login">
            <button className="bg-red-600 text-white px-6 py-2 rounded-full flex items-center gap-2 w-fit">
              <FaUser />
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}