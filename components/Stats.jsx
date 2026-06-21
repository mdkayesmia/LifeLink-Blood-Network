'use client'
import { useEffect, useState } from "react";
import {supabase} from "@/lib/supabase"
import {
  FaUsers,
  FaTint,
  FaHospital,
  FaExchangeAlt,
  FaShieldAlt
} from "react-icons/fa";
import toast,{Toaster} from "react-hot-toast";

export default function Stats() {
  const [totalDonors,setTotalDonors]=useState(0)
  useEffect(()=>{
       const fetchDonors=async()=>{
           const{data,error}= await supabase.from("donors").select("*")
           if(error){
            toast.error("Error occurs")
           }else{
            setTotalDonors(data.length)
           }
       }
       fetchDonors()
  },[])
  const stats = [
    {
      icon: <FaUsers />,
      value: totalDonors,
      title: "Registered Donors"
    },
    {
      icon: <FaTint />,
      value: "8,320+",
      title: "Blood Units"
    },
    {
      icon: <FaHospital />,
      value: "320+",
      title: "Hospitals"
    },
    {
      icon: <FaExchangeAlt />,
      value: "5,680+",
      title: "Requests"
    },
    {
      icon: <FaShieldAlt />,
      value: "100%",
      title: "Safe & Secure"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto -mt-10 relative z-10">
      <div className="bg-white rounded-3xl shadow-lg p-8 grid md:grid-cols-5 gap-6">

        {stats.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-red-600 text-3xl flex justify-center mb-3">
              {item.icon}
            </div>

            <h2 className="text-3xl font-bold">
              {item.value}+
            </h2>

            <p className="text-gray-500">
              {item.title}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}