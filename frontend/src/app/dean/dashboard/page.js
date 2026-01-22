"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LecturerForm from "@/components/LecturerForm";
import StudentForm from "@/components/StudentForm";
import Navbar from "@/components/Navbar";

export default function DeanDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if dean token exists
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // optional: store role on login

    if (!token || role !== "DEAN") {
      // redirect to login if no token or wrong role
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-8 space-y-10">
        <h1 className="text-3xl font-bold">Dean Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <LecturerForm />
          <StudentForm />
        </div>
      </div>
    </div>
  );
}
