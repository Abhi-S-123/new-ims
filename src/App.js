import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import AddCustomers from "./components/AddCustomers";
import AddSuppliers from "./components/AddSupplier";
import AddProducts from "./components/AddProducts";
import Reports from "./components/Reports";
import InTransaction from "./components/InTransaction";
import OutTransaction from "./components/OutTransaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/AddCustomers" element={<AddCustomers />}></Route>
        <Route path="/AddSuppliers" element={<AddSuppliers />}></Route>
        <Route path="/AddProducts" element={<AddProducts />}></Route>
        <Route path="/InTransaction" element={<InTransaction />}></Route>
        <Route path="/OutTransaction" element={<OutTransaction />}></Route>
        <Route path="/Reports" element={<Reports />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
