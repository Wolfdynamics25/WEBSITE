import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-tac-900 text-tac-100 relative">
      <div className="grain-overlay" aria-hidden="true" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
