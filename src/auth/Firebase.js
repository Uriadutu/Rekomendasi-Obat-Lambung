import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Firebase config (gantilah dengan konfigurasi proyek Firebase Anda)
const firebaseConfig = {
  apiKey: "AIzaSyDwo7pWcSsuuJyXQ6bt79WAOqA_JJhumGY",
  authDomain: "rekom-asam-lambung.firebaseapp.com",
  projectId: "rekom-asam-lambung",
  storageBucket: "rekom-asam-lambung.firebasestorage.app",
  messagingSenderId: "856149103516",
  appId: "1:856149103516:web:a260b128d12e51e77fae59",
  measurementId: "G-5VMRD62WJM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);

export { auth, storage };