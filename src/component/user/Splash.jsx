import React from "react";
import sp from "../../img/sp.png";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <div className="flex bg-gradient-to-b from-[#0c8e20] to-[#027514] sm:bg-gradient-to-bl sm:from-[#0c8e20] sm:to-[#027514] min-h-screen w-full px-6 md:px-16 lg:px-32 xl:px-52 items-center justify-center">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-6 items-center text-center md:text-left">
        {/* Bagian Teks */}
        <div className="md:col-span-2 order-1 md:order-none">
          <h1 className="text-3xl md:text-4xl text-white font-semibold mb-4">
            Rekomendasi Obat Asam Lambung
          </h1>
          <p className="text-white text-sm md:text-base lg:text-lg mb-6">
            Aplikasi ini memberikan rekomendasi obat asam lambung yang aman dan
            efektif, membantu Anda mengelola gejala dengan mudah. Temukan
            pilihan terbaik untuk meredakan asam lambung dan rasakan
            kenyamanan kembali.{" "}
          </p>
        </div>

        {/* Bagian Gambar */}
        <div className="flex justify-center items-center order-2 md:order-none">
          <img src={sp} className="w-32 md:w-40" alt="Logo" />
        </div>

        {/* Bagian Tombol */}
        <div className="order-3 md:col-span-3 flex justify-start">
          <Link
            to="/beranda"
            className="bg-white text-green-700 py-2 px-6 md:px-10 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Mulai
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Splash;
