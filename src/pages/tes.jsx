import axios from "axios";
import React, { useState, useEffect } from "react";
import { storage } from "../auth/Firebase";
import { ref, uploadBytes } from "firebase/storage";

const Tess = () => {
  const [resolution, setResolution] = useState(8); // Default HD (1280x720)
  const [status, setStatus] = useState(""); // Status untuk melihat apakah perintah berhasil
  const baseUrl = "http://192.168.175.69:81/control";
  const imageUrl = "http://192.168.175.69:81/capture"; // URL untuk mengambil gambar dari ESP32-CAM

  // Fungsi untuk mengubah resolusi kamera
  const handleResolutionChange = () => {
    axios
      .get(`${baseUrl}?var=framesize&val=${resolution}`)
      .then(() => setStatus(`Resolution changed to ${resolution}`))
      .catch(() => setStatus("Failed to change resolution"));
  };

  // Fungsi untuk mengambil gambar dari ESP32-CAM dan mengunggah ke Firebase
  const captureAndUpload = async () => {
    try {
      // Ambil gambar dari ESP32-CAM
      const response = await axios.get(imageUrl, { responseType: "blob" });
      const imageBlob = response.data;

      // Buat referensi ke Firebase Storage
      const imageName = `esp32-cam-${Date.now()}.jpg`;
      const storageRef = ref(storage, `esp32-images/${imageName}`);

      // Upload gambar ke Firebase Storage
      await uploadBytes(storageRef, imageBlob);
      console.log(`Image uploaded: ${imageName}`);
      setStatus("Image uploaded successfully");
    } catch (error) {
      console.error("Error capturing image:", error);
      setStatus("Failed to upload image");
    }
  };

  // Gunakan useEffect untuk menjalankan captureAndUpload setiap 2 menit
  useEffect(() => {
    const interval = setInterval(() => {
      captureAndUpload();
    }, 120000); // 2 menit (120000 ms)
    
    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, []);

  return (
    <div>
      <h2>Camera Settings</h2>

      <label>Resolution:</label>
      <select value={resolution} onChange={(e) => setResolution(parseInt(e.target.value, 10))}>
        <option value="10">UXGA (1600x1200)</option>
        <option value="9">SXGA (1280x1024)</option>
        <option value="8">HD (1280x720)</option>
        <option value="7">XGA (1024x768)</option>
        <option value="6">SVGA (800x600)</option>
        <option value="5">VGA (640x480)</option>
        <option value="4">CIF (400x296)</option>
        <option value="3">QVGA (320x240)</option>
        <option value="2">HQVGA (240x176)</option>
        <option value="1">QQVGA (160x120)</option>
      </select>

      <button onClick={handleResolutionChange}>Apply Resolution</button>
      <button onClick={captureAndUpload}>Capture & Upload</button>

      {status && <p>{status}</p>}

      <iframe
        width={640}
        height={480}
        src="http://192.168.175.69:81/stream"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Tess;
