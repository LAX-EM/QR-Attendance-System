"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import StudentForm from "@/components/StudentForm";

import LectureSessionForm from "@/components/LectureSessionForm";
import LectureSessionList from "@/components/LectureSessionList";

export default function LecturerDashboard() {
  // 🔁 used to refresh session list after creation
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <ProtectedRoute role="LECTURER">
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="p-8 space-y-10">
          <h1 className="text-3xl font-bold">Lecturer Dashboard</h1>

          {/* 1️⃣ Create Lecture Session */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              Create Lecture Session
            </h2>

            <LectureSessionForm
              onSessionCreated={() => setRefreshKey((k) => k + 1)}
            />
          </section>

          {/* 2️⃣ View Created Sessions */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              My Lecture Sessions
            </h2>

            <LectureSessionList refreshKey={refreshKey} />
          </section>

          {/* 3️⃣ Student Registration (UNCHANGED) */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              Register Students
            </h2>
            <div className="max-w-md">
              <StudentForm />
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}
