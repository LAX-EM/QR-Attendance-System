"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/");
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold">University System</h1>
      <button onClick={logout} className="text-red-600">
        Logout
      </button>
    </div>
  );
}
