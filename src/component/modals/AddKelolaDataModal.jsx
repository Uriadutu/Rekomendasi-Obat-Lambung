import React, { useState, useEffect } from "react";
import { db } from "../../auth/Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";

const EditObatModal = ({ setIsOpenModalAdd, getData }) => {
  const [namaObat, setNamaObat] = useState("");
  const [gejalaList, setGejalaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gejalaOptions, setGejalaOptions] = useState([]);
  const [obatOptions, setObatOptions] = useState([]);
  const [obatId, setObatId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const obatSnapshot = await getDocs(collection(db, "obat"));
        const obatData = obatSnapshot.docs.map((doc) => ({
          id: doc.id,
          nama: doc.data().nama,
        }));
        setObatOptions(obatData);

        const gejalaSnapshot = await getDocs(collection(db, "gejala"));
        const gejalaData = gejalaSnapshot.docs.map((doc) => doc.data().nama);
        setGejalaOptions(gejalaData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleObatChange = async (e) => {
    const selectedObat = e.target.value;
    setNamaObat(selectedObat);

    const selectedObatData = obatOptions.find(
      (obat) => obat.nama === selectedObat
    );
    if (selectedObatData) {
      setObatId(selectedObatData.id);
      try {
        const obatRef = doc(db, "obat", selectedObatData.id);
        const obatSnap = await getDoc(obatRef);

        if (obatSnap.exists()) {
          const data = obatSnap.data();
          setGejalaList(
            data.gejalaList?.map((item) => ({
              gejala: item.gejala,
              keyakinan: item.keyakinan
                ? (item.keyakinan * 100).toString()
                : "0",
            })) || []
          );
        }
      } catch (error) {
        console.error("Gagal mengambil data obat:", error);
      }
    }
  };

  const handleTambahGejala = () => {
    setGejalaList([...gejalaList, { gejala: "", keyakinan: "1" }]);
  };

  const handleHapusGejala = (index) => {
    setGejalaList(gejalaList.filter((_, i) => i !== index));
  };

  const handleGejalaChange = (index, field, value) => {
    const updatedList = [...gejalaList];
    updatedList[index][field] = value;
    setGejalaList(updatedList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek apakah ada gejala yang belum terisi
    if (gejalaList.some((item) => !item.gejala)) {
      alert("Silakan lengkapi semua data gejala.");
      return;
    }

    // Cek apakah ada keyakinan yang belum dipilih
    if (gejalaList.some((item) => !item.keyakinan)) {
      alert("Silakan lengkapi semua data keyakinan.");
      return;
    }

    setLoading(true);
    try {
      if (obatId) {
        await updateDoc(doc(db, "obat", obatId), {
          gejalaList: gejalaList.map((item) => ({
            gejala: item.gejala,
            keyakinan: Number((item.keyakinan / 100).toFixed(1)),
          })),
          updatedAt: new Date(),
        });
      }
      setIsOpenModalAdd(false);
      getData();
    } catch (error) {
      console.error("Error mengupdate obat:", error);
      alert("Gagal mengupdate obat");
    }
    setLoading(false);
  };

  const getAvailableGejalaOptions = (selectedGejala) => {
    return gejalaOptions.filter(
      (gejala) =>
        !gejalaList.some((item) => item.gejala === gejala) ||
        selectedGejala === gejala
    );
  };

  return (
    <div className="fixed inset-0 px-2 flex items-center sm:items-start sm:pt-3 justify-center bg-black z-40 bg-opacity-60">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 rounded-t flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-700">
            Gejala Obat {namaObat}
          </h3>
          <button
            onClick={() => setIsOpenModalAdd(false)}
            className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-700 bg-transparent rounded-lg hover:bg-red-500 hover:text-gray-100 ms-auto transition duration-300"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-gray-700">
          {/* Pilih Obat */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pilih Obat
            </label>
            <select
              value={namaObat}
              onChange={handleObatChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="">Pilih Obat</option>
              {obatOptions.map((obat) => (
                <option key={obat.id} value={obat.nama}>
                  {obat.nama}
                </option>
              ))}
            </select>
          </div>

          {/* List Gejala */}
          {namaObat && (
            <div className="space-y-4">
              {gejalaList.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <select
                    value={item.gejala}
                    onChange={(e) =>
                      handleGejalaChange(index, "gejala", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                  >
                    <option value="">Pilih Gejala</option>
                    {getAvailableGejalaOptions(item.gejala).map((gejala, i) => (
                      <option key={i} value={gejala}>
                        {gejala}
                      </option>
                    ))}
                  </select>
                  <select
                    value={item.keyakinan}
                    onChange={(e) =>
                      handleGejalaChange(index, "keyakinan", e.target.value)
                    }
                    className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                  >
                    <option value="">Keyakinan</option>
                    {[...Array(10).keys()].map((i) => {
                      const persen = (i + 1) * 10;
                      return (
                        <option key={i} value={persen}>
                          {persen}%
                        </option>
                      );
                    })}
                  </select>

                  <button
                    type="button"
                    onClick={() => handleHapusGejala(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleTambahGejala}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                + Tambah Gejala
              </button>
            </div>
          )}
          <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={() => setIsOpenModalAdd(false)}
              className="px-4 py-2 bg-gray-200 border border-gray-400 text-gray-500 text-sm rounded hover:bg-gray-100 transition duration-300"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00D020] px-3 py-2 text-white font-semibold text-sm rounded hover:bg-[#3bdf54] transition duration-300"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>

        {/* Footer */}
      </motion.div>
    </div>
  );
};

export default EditObatModal;
