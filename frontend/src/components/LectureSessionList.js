"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function LectureSessionList({ refreshKey }) {
  const [sessions, setSessions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const res = await api.get("/lecture/my-sessions");
        setSessions(res.sessions || []);
      } catch (err) {
        console.error("Load sessions error:", err.message);
        setSessions([]);
      }
    };

    loadSessions();
  }, [refreshKey]);

  return (
    <div className="space-y-2">
      {sessions.length === 0 && (
        <p className="text-gray-500">No sessions created yet.</p>
      )}

      {sessions.map((s) => (
        <div
          key={s._id}
          className="border bg-white p-3 rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              {s.moduleCode} – {s.lectureTopic}
            </p>
            <p className="text-sm">
              {s.lectureDate} | {s.timePeriod}
            </p>
            <p className="text-sm">Location: {s.location}</p>
          </div>

          <div className="flex gap-2">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => router.push(`/lecturer/attendance/${s._id}`)}
            >
              View Attendance
            </button>

            <a
              href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/attendance/${s.qrToken}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              QR Link
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
