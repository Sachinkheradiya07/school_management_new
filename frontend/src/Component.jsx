import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./user/Admin.jsx";
import Student from "./user/Student.jsx";
import Faculty from "./user/Faculty.jsx";
import Navbar from "./navbar/navbar.jsx";

export default function Component() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student />} />
          <Route path="/faculty" element={<Faculty />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
