"use client";
import { useState } from "react";
import { api } from "@/services/api";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api("/auth/forgot-password", "POST", { identifier });
      setMessage(res.message);
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input
          type="text"
          placeholder="Enter your email or user ID"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="input mb-4 w-full"
        />
        <button type="submit" className="btn w-full">Send Reset Link</button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
}
