"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FaQuestionCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function BloodRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from("blood_requests")
                .select("*").order("created_at", { ascending: false });

            if (error) {
                console.log("Supabase error:", error.message);
            } else {
                setRequests(data);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    //Status change function
    const statusChangeHandler = async (id) => {
        const { error } = await supabase.from("blood_requests").update({ status: "Approved" }).eq("id", id)
        if (error) {
            toast.error(error)
        } else {
            toast.success("status changed sucessfull")
            window.location.reload();
        }

    }

    return (
        <div className="min-h-screen bg-gray-100 px-10 pt-3">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold text-red-600 mb-6">
                    Blood Requests||Help the people||Allah will help you </h1>
                <Link href={"/request/form"}><button className="bg-red-500 text-white font-bold p-2 rounded cursor-pointer"> Request Blood</button></Link>
            </div>

            {requests.length === 0 ? (
                <p>No data found</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {requests.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow flex justify-between">
                            <div className="ml-5">
                                <h2 className="text-xl font-bold">{item.patient_name}</h2>
                                <p>Blood Group: {item.blood_group}</p>
                                <p>Units: {item.units}</p>
                                <p>Hospital: {item.hospital}</p>
                                <p>Phone: {item.phone}</p>
                                <p>Location: {item.location}</p>
                                <p>Date: {item.required_date}</p>

                                {item.emergency && (
                                    <p className="text-red-600 font-bold">🚨 Emergency</p>
                                )}
                            </div>
                            <div><button onClick={() => statusChangeHandler(item.id)} className={`px-2 py-1 rounded text-white ${item.status === "Approved"
                                    ? "bg-green-500"
                                    : item.status === "Pending"
                                        ? "bg-red-500"
                                        : "bg-yellow-500"
                                }`}><p>{item.status}</p></button></div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}