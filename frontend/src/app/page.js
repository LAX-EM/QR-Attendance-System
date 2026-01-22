"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../services/api";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        identifier,
        password,
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      if (res.role === "DEAN") router.push("/dean/dashboard");
      if (res.role === "LECTURER") router.push("/lecturer/dashboard");
      if (res.role === "STUDENT") router.push("/student/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded w-96" onSubmit={login}>
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <Input
          label="Email or ID"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button text="Login" />

        <div className="mt-4 text-right">
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}
