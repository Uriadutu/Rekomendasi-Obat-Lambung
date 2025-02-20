import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/Firebase"; 
import Logo from "../img/sp.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/data-obat");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Pengguna tidak ditemukan.");
      } else if (err.code === "auth/wrong-password") {
        setError("Kata sandi salah.");
      } else if (err.code === "auth/invalid-email") {
        setError("Email tidak valid.");
      } else {
        setError("Login gagal! Periksa email dan kata sandi Anda.");
      }
    }
  };

  return (
    <div className="bg-gray-100 w-full h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl">
        <form className="px-4 py-6" onSubmit={handleLogin}>
          {/* Logo & Judul */}
          <div className="flex flex-col items-center">
            <img src={Logo} alt="Logo" className="w-20 sm:w-24 mb-2" />
            <p className="text-gray-800 font-semibold text-xl sm:text-2xl">Masuk</p>
          </div>

          {/* Pesan Error */}
          {error && (
            <p className="text-red-600 font-medium border border-red-400 bg-red-100 rounded-md text-sm p-2 mt-3 text-center">
              {error}
            </p>
          )}

          {/* Input Email */}
          <div className="mt-4">
            <label className="text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 mt-1"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Input Password */}
          <div className="mt-3">
            <label className="text-gray-700 text-sm font-medium">Kata Sandi</label>
            <input
              type="password"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 mt-1"
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 flex flex-col space-y-3">
            <button
              type="button"
              onClick={() => navigate("/beranda")}
              className="w-full p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
