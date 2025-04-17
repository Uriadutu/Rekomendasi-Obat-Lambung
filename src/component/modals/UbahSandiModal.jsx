import React, { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "../../auth/Firebase";

const UbahSandiModal = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdatePassword = async () => {
    setMessage("");
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Kata sandi tidak cocok.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("Pengguna tidak ditemukan.");
        return;
      }

      await updatePassword(user, newPassword);
      setMessage("Kata sandi berhasil diperbarui.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/requires-recent-login") {
        setError("Sesi login kedaluwarsa. Silakan login ulang.");
      } else {
        setError("Gagal memperbarui kata sandi.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center w-full z-50">
      <div className="bg-white rounded-md shadow-md p-6 w-full max-w-sm relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ubah Kata Sandi</h2>

        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        {message && <p className="text-sm text-green-600 mb-2">{message}</p>}

        <input
          type="password"
          placeholder="Kata sandi baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

        <input
          type="password"
          placeholder="Konfirmasi kata sandi"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 text-gray-600 hover:underline"
          >
            Batal
          </button>
          <button
            onClick={handleUpdatePassword}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default UbahSandiModal;
