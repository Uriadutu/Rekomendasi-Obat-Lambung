import { AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import InfoGejalaModal from "../modals/InfoGejalaModal";
import { useState } from "react";

const HasilPerhitungan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const { hasilRekomendasi, gejalaUser } = location.state || {
    hasilRekomendasi: [],
    gejalaUser: [],
  };

  return (
    <div className="px-1 md:px-10 w-full">
      <AnimatePresence>
        {openModalInfo && (
          <InfoGejalaModal
            setIsOpenModalAdd={setOpenModalInfo}
            gejalaUser={gejalaUser}
          />
        )}
      </AnimatePresence>
      <div className="px-4 md:px-10 py-2 md:py-10">
        
        <header className="border-b border-gray-200">
          <div className="bg-white rounded-t px-3 py-4 font-bold text-lg md:text-xl">
            <h1 className="text-center md:text-left">Hasil Rekomendasi Obat</h1>
          </div>
        </header>
        <div className="bg-white rounded-b px-3 py-4">
          <div className="flex gap-3 items-center mb-4">
            <button
              className=" px-4 py-2 bg-gray-200 border border-gray-400 text-gray-700 text-sm rounded hover:bg-gray-100 transition duration-300"
              onClick={() => navigate("/beranda")}
            >
              Kembali
            </button>
            <button className="btn-add" onClick={() => setOpenModalInfo(true)}>
              Lihat Gejala
            </button>
          </div>
          {hasilRekomendasi.length > 0 ? (
            <ul className="space-y-4">
              {hasilRekomendasi.map((item, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="font-semibold mb-1">
                    {index + 1}. {item.nama}
                  </div>
                  <div className="relative w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-green-500 transition-all"
                      style={{ width: `${item.nilai}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-700 mt-1">
                    Persentase Rekomendasi:{" "}
                    {item.nilai > 100 ? 100 : item.nilai}%
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">
              Tidak ada hasil rekomendasi.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HasilPerhitungan;
