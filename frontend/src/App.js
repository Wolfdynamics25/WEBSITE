import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Pending from "@/pages/Pending";
import Admin from "@/pages/Admin";
import Portal from "@/pages/Portal";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen bg-tac-900 text-tac-100 relative">
      <div className="grain-overlay" aria-hidden="true" />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/pending"
              element={
                <ProtectedRoute roles={["pending"]}>
                  <Pending />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/portal"
              element={
                <ProtectedRoute roles={["admin", "investor", "partner", "team"]}>
                  <Portal />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#131817",
            border: "1px solid rgba(232, 119, 34, 0.35)",
            color: "#E8E4D8",
            borderRadius: "2px",
            fontFamily: "'Barlow', sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
