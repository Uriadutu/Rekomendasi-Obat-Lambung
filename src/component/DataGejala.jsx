import React, { useEffect, useRef, useState } from "react";
import AddGejalaModal from "./modals/AddGejalaModal";
import { AnimatePresence } from "framer-motion";
import { db } from "../auth/Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {capitalizeWords, parseAndFormatDateString} from "../utils/helper";
const DataGejala = () => {


  const [openModal, setOpenModal] = useState(false);
  const [dataGejala, setDataGejala] = useState([]);
  // 🔥 Ambil data gejala dari Firestore
  useEffect(() => {
    fetchGejala();
  }, [openModal]); // Ambil ulang data setelah modal ditutup

  const fetchGejala = async () => {
    const querySnapshot = await getDocs(collection(db, "gejala"));
    const gejalaList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDataGejala(gejalaList);
  };

  // 🚀 Fungsi hapus gejala dari Firestore
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus gejala ini?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "gejala", id));
      setDataGejala((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Gagal menghapus gejala:", error);
      alert("Gagal menghapus gejala!");
    }
  };

  return (
    <div className="p-4">
      <AnimatePresence>
        {openModal && <AddGejalaModal setIsOpenModalAdd={setOpenModal} />}
      </AnimatePresence>

      <div className="bg-white rounded shadow-lg">
        <header className="border-b border-gray-200 px-3 py-4 font-bold text-xl">
          <h1>Data Gejala</h1>
        </header>
        
        <div className="px-3 py-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setOpenModal(true)} className="btn-add">
              Tambah Gejala
            </button>
          </div>
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Nama Gejala</th>
                <th className="border px-4 py-2">Tanggal Tambah</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataGejala.length > 0 ? (
                dataGejala.map((obat, index) => (
                  <tr key={obat.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{capitalizeWords(obat.nama)}</td>
                    <td className="border px-4 py-2">
                      {parseAndFormatDateString(obat.createdAt
                        ? new Date(
                            obat.createdAt.seconds * 1000
                          ).toLocaleDateString()
                        : "-")}
                    </td>
                    <td className="border px-4 py-2">
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
  );
};

export default DataGejala;
