import Navbar from "../../../components/Navbar";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function StudentDashboard() {
  return (
    <ProtectedRoute role="STUDENT">
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold">Student Dashboard</h2>
        <p>Welcome Student</p>
      </div>
    </ProtectedRoute>
  );
}
