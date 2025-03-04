import React, { useEffect, useState } from "react";
import { db } from "../auth/Firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import AddObatModal from "./modals/AddObatModal";
import { AnimatePresence } from "framer-motion";
import { capitalizeWords } from "../utils/helper";
import { IoSearch } from "react-icons/io5";

const DataObat = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataObat, setDataObat] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔥 Ambil data dari Firestore secara real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "obat"), (snapshot) => {
      const obatList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataObat(obatList);
    });

    return () => unsubscribe(); // Cleanup listener saat komponen unmount
  }, []);

  // 🗑️ Fungsi untuk menghapus obat
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menghapus obat ini?"
    );
    if (konfirmasi) {
      try {
        await deleteDoc(doc(db, "obat", id));
        console.log("Obat berhasil dihapus");
      } catch (error) {
        console.error("Error menghapus obat:", error);
      }
    }
  };

  // 🔍 Filter data berdasarkan searchTerm
  const filteredData = dataObat.filter((obat) =>
    obat.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <AnimatePresence>
        {openModal && <AddObatModal setIsOpenModalAdd={setOpenModal} />}
      </AnimatePresence>

      <div className="bg-white rounded shadow-lg">
        <header className="border-b border-gray-200 px-3 py-4 font-bold text-xl">
          <h1>Data Obat</h1>
        </header>
        <div className="px-3 py-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setOpenModal(true)} className="btn-add">
              Tambah Obat
            </button>
            <div className="flex p-2 border rounded border-gray-200 items-center">
              <input
                type="text"
                placeholder="Cari obat"
                className="text-sm outline-0 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IoSearch color="silver" />
            </div>
          </div>

          {/* 🔹 Tabel Data Obat */}
          <div className="overflow-x-auto">
            <div className="sm:w-auto w-auto">
              <table className="w-full border-collapse border border-gray-400">
                <thead className="bg-gray-100">
                  <tr className="text-left">
                    <th className="border px-4 py-2">No</th>
                    <th className="border px-4 py-2 whitespace-nowrap">
                      Nama Obat
                    </th>
                    <th className="border px-4 py-2 whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((obat, index) => (
                      <tr key={obat.id} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">
                          {capitalizeWords(obat.nama)}
                        </td>
                        <td className="border px-4 py-2 space-x-3">
                          <button
                            onClick={() => handleDelete(obat.id)}
                            className="text-red-500 hover:underline"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="border px-4 py-2 text-center text-gray-500"
                      >
                        Tidak ada data obat
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataObat;
