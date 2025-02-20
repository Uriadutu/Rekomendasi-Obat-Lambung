import React from "react";
import sp from "../../img/sp.png";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <div className="flex bg-[#0c8e20] min-h-screen w-full px-6 md:px-16 lg:px-32 xl:px-52 items-center justify-center">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-10 items-center text-center md:text-left">
        {/* Bagian Teks */}
        <div className="md:col-span-2 order-1 md:order-none">
          <h1 className="text-4xl md:text-5xl lg:text-7xl text-white mb-5">
            Sistem Rekomendasi Obat Asam Lambung
          </h1>
          <p className="text-white text-lg md:text-xl lg:text-2xl mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            deserunt cumque aspernatur. Ducimus sed ut deserunt ex eligendi
            tempore fugit saepe, veritatis architecto quod unde consequatur
            suscipit, maiores natus numquam.
          </p>
        </div>

        {/* Bagian Gambar */}
        <div className="flex justify-center items-center order-2 md:order-none">
          <img src={sp} className="w-48 md:w-64 lg:w-80" alt="Logo" />
        </div>

        {/* Bagian Tombol */}
        <div className="order-3 md:col-span-3 flex justify-center">
          <Link
            to={"/beranda"}
            className="mt-10 bg-[#5D5D5D] bg-opacity-30 text-white py-2 px-10 md:px-20 border border-white rounded-[2px] hover:bg-gray-100 hover:text-gray-700 transition duration-300 inline-block"
          >
            Mulai
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Splash;
