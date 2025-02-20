import React, { useEffect, useState } from "react";
import { db } from "../auth/Firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import AddObatModal from "./modals/AddObatModal";
import { AnimatePresence } from "framer-motion";
import { capitalizeWords, parseAndFormatDateString } from "../utils/helper";

const DataObat = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataObat, setDataObat] = useState([]);

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
          </div>

          {/* 🔹 Tabel Data Obat */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="border px-4 py-2">No</th>
                  <th className="border px-4 py-2">Nama Obat</th>
                  <th className="border px-4 py-2">Tanggal Tambah</th>
                  <th className="border px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataObat.length > 0 ? (
                  dataObat.map((obat, index) => (
                    <tr key={obat.id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">
                        {capitalizeWords(obat.nama)}
                      </td>
                      <td className="border px-4 py-2">
                        {parseAndFormatDateString (obat.createdAt
                          ? new Date(
                              obat.createdAt.seconds * 1000
                            ).toLocaleDateString()
                          : "-")}
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
                      colSpan="4"
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
  );
};

export default DataObat;
