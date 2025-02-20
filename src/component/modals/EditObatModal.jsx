import React, { useState, useEffect } from "react";
import { db } from "../../auth/Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

const EditObatModal = ({ setIsOpenModalAdd, namaObat }) => {
  const [gejalaList, setGejalaList] = useState([{ gejala: "", keyakinan: "" }]);
  const [loading, setLoading] = useState(false);
  const [gejalaOptions, setGejalaOptions] = useState([]);

  useEffect(() => {
    const fetchGejala = async () => {
      const gejalaSnapshot = await getDocs(collection(db, "gejala"));
      const gejalaData = gejalaSnapshot.docs.map(doc => doc.data().nama);
      setGejalaOptions(gejalaData);
    };
    fetchGejala();
  }, []);

  const handleTambahGejala = () => {
    setGejalaList([...gejalaList, { gejala: "", keyakinan: "" }]);
  };

  const handleGejalaChange = (index, field, value) => {
    const updatedList = [...gejalaList];
    updatedList[index][field] = value;
    setGejalaList(updatedList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gejalaList.some((item) => !item.gejala || !item.keyakinan)) {
      alert("Silakan lengkapi semua data gejala dan tingkat keyakinan.");
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "obat"), {
        namaObat,
        gejalaList: gejalaList.map((item) => ({
          gejala: item.gejala,
          keyakinan: parseFloat(item.keyakinan),
        })),
        createdAt: new Date(),
      });
      
      await addDoc(collection(db, "gejalaDalamObat"), {
        obatId: docRef.id,
        namaObat,
        gejalaList,
        createdAt: new Date(),
      });
      
      setIsOpenModalAdd(false);
    } catch (error) {
      console.error("Error menambahkan obat:", error);
      alert("Gagal menambahkan obat");
    }
    setLoading(false);
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 px-2 flex items-center sm:items-start sm:pt-3 justify-center bg-black z-40 bg-opacity-60"
    >
      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-white rounded-lg shadow-lg"
        >
          <div className="flex items-start justify-between p-4 border-b border-gray-200 rounded-t">
          <h3 className="text-xl font-semibold text-gray-700">Tambah Gejala</h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-700 bg-transparent rounded-lg hover:bg-red-500 hover:text-gray-100 ms-auto transition duration-300"
            >
              ✕
            </button>
          </div>
          <div className="p-4 space-y-4 text-gray-700">
            <div className="mb-6 gap-3 grid grid-cols-2 items-center">
              <label className="block text-sm font-medium text-gray-700">Nama Obat</label>
              <input
                type="text"
                value={namaObat}
                disabled
                className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-lg"
              />
            </div>
            <div className="space-y-4">
              {gejalaList.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <select
                    value={item.gejala}
                    onChange={(e) => handleGejalaChange(index, "gejala", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Pilih Gejala</option>
                    {gejalaOptions.map((gejala, i) => (
                      <option key={i} value={gejala}>{gejala}</option>
                    ))}
                  </select>
                  {item.gejala && (
                    <select
                      value={item.keyakinan}
                      onChange={(e) => handleGejalaChange(index, "keyakinan", e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Pilih Keyakinan</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={(i + 1) / 10}>{(i + 1) * 10}%</option>
                      ))}
                    </select>
                  )}
                  <button
                    type="button"
                    onClick={handleTambahGejala}
                    className="bg-green-500 text-white px-3 py-2 rounded"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center w-full justify-end p-4 space-x-3 border-t border-gray-200 rounded-b">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Batal
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default EditObatModal;
