"use client";
import { api } from "@/services/api";
import { useState } from "react";

export default function LecturerForm() {
  const [data, setData] = useState({
    name: "",
    userId: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    if (!data.name || !data.userId || !data.email || !data.password) {
      alert("All fields are required");
      return;
    }

    try {
      await api(
        "/dean/register-lecturer",
        "POST",
        data,
        localStorage.getItem("token")
      );
      alert("Lecturer Registered Successfully");

      // Reset form
      setData({ name: "", userId: "", email: "", password: "" });
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="border p-6 rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Register Lecturer</h2>

      <input
        className="input"
        placeholder="Lecturer Name"
        value={data.name}
        onChange={e => setData({ ...data, name: e.target.value })}
      />

      <input
        className="input"
        placeholder="Lecturer ID (e.g. LEC001)"
        value={data.userId}
        onChange={e => setData({ ...data, userId: e.target.value })}
      />

      <input
        className="input"
        placeholder="Email"
        type="email"
        value={data.email}
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        className="input"
        placeholder="Password"
        type="password"
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <button onClick={submit} className="btn mt-4 w-full">
        Register Lecturer
      </button>
    </div>
  );
}
