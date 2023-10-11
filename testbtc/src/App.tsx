import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import home from "./home";
import Callback from "./callback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={home()} /> {/* 👈 Renders at /app/ */}
        <Route path="/callback" element={Callback()} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
