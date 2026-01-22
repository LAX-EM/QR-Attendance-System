"use client";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { QRCodeCanvas } from "qrcode.react";

export default function LectureSessionForm({ onCreated }) {
  const [form, setForm] = useState({
    moduleCode: "",
    lectureTopic: "",
    lectureDate: "",
    timePeriod: "",
    location: "",
    lecturerName: "",
  });

  const [session, setSession] = useState(null);
  const [pinTimer, setPinTimer] = useState(30);
  const [qrTimer, setQrTimer] = useState(300);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/lecture/create-session", form);
      setSession(res);
      setPinTimer(30);
      setQrTimer(300);
      onCreated?.(); // refresh session list
    } catch (err) {
      setError(err.message || "Error creating session");
    }
  };

  // PIN countdown
  useEffect(() => {
    if (!session) return;
    if (pinTimer === 0) return;

    const t = setTimeout(() => setPinTimer(pinTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [pinTimer, session]);

  // QR countdown
  useEffect(() => {
    if (!session) return;
    if (qrTimer === 0) return;

    const t = setTimeout(() => setQrTimer(qrTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [qrTimer, session]);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="w-full p-2 border rounded"
            required
          />
        ))}

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Generate QR & PIN
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>

      {/* 📦 SESSION DISPLAY */}
      {session && (
        <div className="border p-4 rounded bg-white space-y-3">
          <h3 className="font-bold text-lg">Live Attendance Session</h3>

          <QRCodeCanvas value={session.qrUrl} size={200} />

          <p className="text-xl font-semibold">
            PIN: <span className="text-blue-600">{session.pin}</span>
          </p>

          <p className="text-sm">
            PIN expires in: {pinTimer}s
          </p>

          <p className="text-sm">
            QR expires in: {Math.floor(qrTimer / 60)}:
            {(qrTimer % 60).toString().padStart(2, "0")}
          </p>

          {qrTimer === 0 && (
            <p className="text-red-600 font-semibold">
              Session expired
            </p>
          )}
        </div>
      )}
    </div>
  );
}
