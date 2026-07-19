import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen bg-ocean-950 text-ocean-100 relative">
      <div className="noise-overlay" aria-hidden="true" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0C1420",
            border: "1px solid rgba(0, 229, 255, 0.25)",
            color: "#E6EEF7",
            borderRadius: "2px",
            fontFamily: "'Outfit', sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
