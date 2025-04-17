import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/sp.png";
import { auth } from "../auth/Firebase"; 
const Sidebar = ({ onUbahSandi })  => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/beranda");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className="hidden sm:block z-40 bg-[#0c8e20] w-64 px-6 h-[100vh] drop-shadow-lg relative">
      <div className="w-full">
        <div className="w-full">
          <Link
            to="/data-obat"
            className="mt-5 text-white rounded-md flex justify-center items-center w-full"
          >
            <img src={logo} className="w-32" alt="" />
          </Link>
          <div className="border-b mt-3 border-white w-full "></div>
        </div>
        <div className="mt-3 grid gap-y-3">
          <Link
            to="/data-obat"
            className="rounded-md text-white flex items-center text-sm w-full text-left"
          >
            Data Obat
          </Link>
          <Link
            to="/data-gejala"
            className="rounded-md text-white flex items-center text-sm w-full text-left"
          >
            Data Gejala
          </Link>
          <Link
            to="/kelola-aturan"
            className="rounded-md text-white flex items-center text-sm w-full text-left"
          >
            Kelola Aturan
          </Link>
          <button
          onClick={onUbahSandi}
            className="rounded-md text-white flex items-center text-sm w-full text-left"
          >
            Ubah Kata Sandi
          </button>
          <Link
            to="/coba-perhitungan"
            className="rounded-md text-white flex items-center text-sm w-full text-left"
          >
            Coba Perhitungan
          </Link>
          <button
            onClick={logout}
            className="rounded-md text-white flex items-center text-sm w-full text-left"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
