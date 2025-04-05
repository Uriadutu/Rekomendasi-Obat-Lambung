import React, { useEffect, useState } from "react";
import AddGejalaModal from "./modals/AddGejalaModal";
import EditGejalaModal from "./modals/EditGejalaModal";
import { AnimatePresence } from "framer-motion";
import { db } from "../auth/Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { capitalizeWords } from "../utils/helper";
import { IoSearch } from "react-icons/io5";

const DataGejala = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedGejala, setSelectedGejala] = useState(null);
  const [dataGejala, setDataGejala] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchGejala();
  }, [openModal, openModalEdit]);

  const fetchGejala = async () => {
    const querySnapshot = await getDocs(collection(db, "gejala"));
    const gejalaList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDataGejala(gejalaList);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus gejala ini?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "gejala", id));
      setDataGejala((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Gagal menghapus gejala:", error);
      alert("Gagal menghapus gejala!");
    }
  };

  const handleEditGejala = (gejala) => {
    setSelectedGejala(gejala);
    setOpenModalEdit(true);
  };

  const filteredData = dataGejala.filter((gejala) =>
    gejala.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <AnimatePresence>
        {openModal && <AddGejalaModal setIsOpenModalAdd={setOpenModal} />}
      </AnimatePresence>
      <AnimatePresence>
        {openModalEdit && selectedGejala && (
          <EditGejalaModal
            setIsOpenModalEdit={setOpenModalEdit}
            gejala={selectedGejala}
          />
        )}
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
            <div className="flex p-2 border rounded border-gray-200 items-center">
              <input
                type="text"
                placeholder="Cari gejala"
                className="text-sm outline-0 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IoSearch color="silver" />
            </div>
          </div>

          <div className="w-full max-w-full overflow-x-auto">
            <div className="sm:w-auto w-auto">
              <table className="min-w-full border-collapse border border-gray-400">
                <thead className="bg-gray-100">
                  <tr className="text-left">
                    <th className="border px-4 py-2">No</th>
                    <th className="border px-4 py-2 whitespace-nowrap">Nama Gejala</th>
                    <th className="border px-4 py-2 whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((gejala, index) => (
                      <tr key={gejala.id} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">
                          {capitalizeWords(gejala.nama)}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => handleEditGejala(gejala)}
                            className="text-blue-500 hover:underline mr-2"
                          >
                            Ubah
                          </button>
                          <button
                            onClick={() => handleDelete(gejala.id)}
                            className="text-red-500 hover:underline"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="border px-4 py-2 text-center text-gray-500">
                        Tidak ada data gejala
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

export default DataGejala;
