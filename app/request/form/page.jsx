"use client";

import { useState,useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

// icons
import { FaUser, FaTint, FaProcedures, FaHospital, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaStickyNote } from "react-icons/fa";
import Link from "next/link";

export default function BloodRequestPage() {
    const router=useRouter()
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    units: "",
    hospital: "",
    phone: "",
    location: "",
    requiredDate: "",
    emergency: false,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("blood_requests").insert([
      {
        patient_name: formData.patientName,
        blood_group: formData.bloodGroup,
        units: Number(formData.units),
        hospital: formData.hospital,
        phone: formData.phone,
        location: formData.location,
        required_date: formData.requiredDate,
        emergency: formData.emergency,
        notes: formData.notes,
      },
    ]);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Blood request submitted successfully!");

    setFormData({
      patientName: "",
      bloodGroup: "",
      units: "",
      hospital: "",
      phone: "",
      location: "",
      requiredDate: "",
      emergency: false,
      notes: "",
    });
  };

  const inputClass =
    "w-full border p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400";

  const wrapper = "relative";

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 bg-[url('/login-bg.jpg')] bg-center bg-cover">
      <Toaster position="right-top" />

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-red-600 mb-6">
          Blood Request Form
        </h1>
        <Link href={"/request"}><FiLogOut className="text-red-500 text-xl"/></Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Patient Name */}
          <div className={wrapper}>
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Blood Group */}
          <div className={wrapper}>
            <FaTint className="absolute left-3 top-3 text-red-400" />
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          {/* Units */}
          <div className={wrapper}>
            <FaProcedures className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              name="units"
              placeholder="Units Needed"
              value={formData.units}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Hospital */}
          <div className={wrapper}>
            <FaHospital className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="hospital"
              placeholder="Hospital Name"
              value={formData.hospital}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div className={wrapper}>
            <FaPhone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Location */}
          <div className={wrapper}>
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Date */}
          <div className={wrapper}>
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="date"
              name="requiredDate"
              value={formData.requiredDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Emergency */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="emergency"
              checked={formData.emergency}
              onChange={handleChange}
            />
            Emergency Request
          </label>

          {/* Notes */}
          <div className={wrapper}>
            <FaStickyNote className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="notes"
              placeholder="Additional Notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}