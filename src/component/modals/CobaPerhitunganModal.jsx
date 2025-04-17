import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CobaPerhitunganModal = ({ setIsOpenModalAdd, selectedGejala, obatData }) => {
  const [nilaiKeyakinan, setNilaiKeyakinan] = useState({});
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleReset = () => {
    setNilaiKeyakinan({});
  };

  const hitungCertaintyFactor = () => {
    if (!selectedGejala.length || !obatData.length) {
      setMsg("Data gejala atau obat tidak tersedia!");
      return;
    }

    if (Object.keys(nilaiKeyakinan).length !== selectedGejala.length) {
      setMsg("Pilih nilai keyakinan!");
      return;
    }

    let hasilPerhitungan = [];
    let riwayatLangkah = [];

    const obatValid = obatData.filter(
      (obat) => Array.isArray(obat.gejalaList) && obat.gejalaList.length > 0
    );

    if (obatValid.length === 0) {
      setMsg("Tidak ada obat yang sesuai dengan gejala yang dipilih!");
      return;
    }

    selectedGejala.forEach((gejala) => {
      obatValid.forEach((obat) => {
        const gejalaDitemukan = obat.gejalaList.find(
          (g) => g.gejala === gejala.nama
        );

        if (!gejalaDitemukan) return;

        const cfPakar = parseFloat(gejalaDitemukan.keyakinan) || 0;
        const cfUser = nilaiKeyakinan[gejala.id] || 0;
        const cfKombinasi = cfPakar * cfUser;

        hasilPerhitungan.push({
          namaObat: obat.nama,
          gejala: gejala.nama,
          cf: cfKombinasi,
        });

        riwayatLangkah.push({
          namaObat: obat.nama,
          gejala: gejala.nama,
          cfPakar : cfPakar,
          cfUser,
          cfKombinasi,
          rumus: `CF = ${cfPakar} x ${cfUser} = ${cfKombinasi}`,
        });
      });
    });

    const totalCF = {};
    const detailCF = {};

    hasilPerhitungan.forEach(({ namaObat, cf }) => {
      if (!totalCF[namaObat]) {
        totalCF[namaObat] = cf;
        detailCF[namaObat] = [cf];
      } else {
        const prev = totalCF[namaObat];
        const combined = prev + cf * (1 - prev);
        totalCF[namaObat] = combined;
        detailCF[namaObat].push(cf);

        riwayatLangkah.push({
          namaObat,
          kombinasiSebelumnya: prev.toFixed(2),
          cfBaru: cf.toFixed(2),
          rumus: `CF combine = ${prev.toFixed(4)} + ${cf.toFixed(4)} x (1 - ${prev.toFixed(4)}) = ${combined.toFixed(4)}`
        });
      }
    });

    const rekomendasiObat = Object.entries(totalCF)
      .map(([namaObat, cfTotal]) => ({
        nama: namaObat,
        nilai: (cfTotal * 100).toFixed(2),
      }))
      .sort((a, b) => b.nilai - a.nilai);

    const dataUser = selectedGejala.map((gejala) => ({
      id: gejala.id,
      nama: gejala.nama,
      keyakinan: nilaiKeyakinan[gejala.id],
    }));

    navigate("/coba-perhitungan/hasil-rekomendasi", {
      state: {
        hasilRekomendasi: rekomendasiObat,
        gejalaUser: dataUser,
        langkahPerhitungan: riwayatLangkah,
      },
    });
  };

  return (
    <div className="fixed inset-0 px-2 flex items-center sm:items-start sm:pt-3 justify-center bg-black bg-opacity-70 z-40">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl bg-white text-gray-700 rounded-lg shadow-lg"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold">Tentukan Nilai Keyakinan</h3>
          <button
            onClick={() => setIsOpenModalAdd(false)}
            className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-700 bg-transparent rounded-lg hover:bg-red-500 hover:text-white ms-auto transition duration-300"
          >
            ✕
          </button>
        </div>

        {/* Konten */}
        <div className="py-2 px-6 max-h-[60vh] overflow-y-auto">
          <div className="w-full grid grid-cols-4">
            <div></div>
            <div className="flex w-full justify-between col-span-3">
              <p className="text-start text-xs">
                Kurang <br /> Yakin
              </p>
              <p className="text-end text-xs">
                Sangat <br /> Yakin
              </p>
            </div>
          </div>

          {/* List Gejala */}
          <div className="space-y-2 mt-2">
            {selectedGejala.length > 0 ? (
              selectedGejala.map((gejala) => (
                <div
                  key={gejala.id}
                  className="grid grid-cols-4 gap-2 items-center"
                >
                  <span className="font-medium">{gejala.nama}</span>
                  <div className="col-span-3 flex justify-between">
                    {Array.from({ length: 10 }).map((_, index) => {
                      const nilai = (index + 1) / 10;
                      return (
                        <label
                          key={index}
                          className="inline-flex items-center text-center"
                        >
                          <input
                            type="radio"
                            name={`nilai_gejala_${gejala.id}`}
                            value={nilai}
                            checked={nilaiKeyakinan[gejala.id] === nilai}
                            onChange={() =>
                              setNilaiKeyakinan((prev) => ({
                                ...prev,
                                [gejala.id]: nilai,
                              }))
                            }
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Tidak ada gejala yang dipilih.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center w-full justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
          <p className="text-red-500 text-sm">{msg}</p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 border border-gray-400 text-gray-500 text-sm rounded hover:bg-gray-100 transition duration-300"
          >
            Ulang
          </button>
          <button
            onClick={hitungCertaintyFactor}
            className="bg-[#00D020] px-3 py-2 text-white font-semibold text-sm rounded hover:bg-[#3bdf54] transition duration-300"
          >
            Periksa
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CobaPerhitunganModal;
