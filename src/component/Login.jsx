import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../auth/Firebase";
import Logo from "../img/sp.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/data-obat");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Pengguna tidak ditemukan.");
      } else if (err.code === "auth/wrong-password") {
        setError("Kata sandi salah.");
      } else if (err.code === "auth/invalid-email") {
        setError("Pengguna Tidak Ditemukan");
      } else {
        setError("Gagal Masuk! Periksa nama pengguna dan kata sandi Anda.");
      }
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetMessage("");

    if (!email) {
      setError("Masukkan Nama Pengguna Untuk Mengatur Ulang Kata Sandi.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Pesan Pengaturan Ulang Kata Sandi Telah Dikirim.");
    } catch (err) {
      setError("Gagal mengirim Pesan pengaturan ulang kata sandi.");
    }
  };

  return (
    <div className="bg-gray-100 w-full h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-4 shadow-md rounded-[2px]">
          <form className="px-6 pt-6 pb-6 w-full mx-auto" onSubmit={handleLogin}>
            {/* Logo & Judul */}
            <div className="flex flex-col w-full items-center">
              <img src={Logo} alt="Logo" className="w-24 sm:w-28 mb-2" />
              <div className="relative w-full z-10 mb-3">
                <div className="text-gray-800 text-center z-10 absolute flex w-full justify-center font-semibold text-2xl">
                  <p className="bg-white px-3 sm:text-2xl text-lg">Masuk</p>
                </div>
                <div className="absolute top-4 sm:top-5 z-0 w-full">
                  <div className="border-b border-gray-400 w-full"></div>
                </div>
              </div>
            </div>

            {/* Pesan Error & Reset */}
            <div className="mt-10"> 

            {error && (
              <p className="text-red-600 z-1 border border-red-400 bg-red-100 rounded-[2px] text-sm p-2 my-2 text-center">
                {error}
              </p>
            )}
            {resetMessage && (
              <p className="text-green-600 border border-green-400 bg-green-100 rounded-[2px] text-sm p-2 my-2 text-center">
                {resetMessage}
              </p>
            )}
            </div>

            {/* Input Email */}
            <div className="mt-10">
              <input
                type="email"
                className="w-full p-3 rounded-[2px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 mt-1"
                placeholder="Nama Pengguna"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Input Password */}
            <div className="mt-3">
              <input
                type="password"
                className="w-full p-3 rounded-[2px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 mt-1"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Tombol Aksi */}
            <div className="mt-6 flex flex-col space-y-3">
              <button
                type="submit"
                className="w-full p-3 bg-green-500 text-white rounded-[2px] hover:bg-green-600 transition"
              >
                Masuk
              </button>
            </div>

            {/* Lupa kata sandi */}
            <div className="text-left mt-3">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-green-500 hover:underline"
              >
                Lupa kata sandi?
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-4 mt-3 shadow-md w-full max-w-2xl rounded-[2px] text-center">
          <p className="text-gray-700 text-sm">
            Belum Mempunyai Akun?{" "}
            <Link to={"/"} className="text-green-500 font-medium hover:underline">
              Kembali
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
