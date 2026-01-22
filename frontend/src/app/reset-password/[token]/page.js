"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/services/api";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { token } = useParams();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api(`/auth/reset-password/${token}`, "POST", { password });
      setMessage(res.message);
      setTimeout(() => router.push("/"), 2000); // redirect after success
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input mb-4 w-full"
        />
        <button type="submit" className="btn w-full">Reset Password</button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
}
