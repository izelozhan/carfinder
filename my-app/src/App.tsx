import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./home";
import Details from "./detail/detail";
import 'react-simple-toasts/dist/style.css';
import { toastConfig } from 'react-simple-toasts';

toastConfig({ theme: 'blue-dusk' });

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/best-pick/:name" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
