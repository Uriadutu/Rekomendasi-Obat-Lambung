import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/userPage/HomePage";
import DataObatPage from "./pages/DataObatPage";
import Splash from "./component/user/Splash";
import Login from "./component/Login";
import DataGejalaPage from "./pages/DataGejalaPage";
import KelolaDataPage from "./pages/KelolaDataPage";
import HasilPerhitunganPage from "./pages/userPage/HasilPerhitunganPage";
import ProtectedRoute from "./ProtectedRoute";
import CobaPerhitunganPage from "./pages/CobaPerhitunganPage";
import HasilCobaPerhitunganPage from "./pages/HasilCobaPerhitunganPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/masuk" element={<Login />} />
        <Route path="/beranda" element={<HomePage />} />
        <Route path="/hasil-perhitungan" element={<HasilPerhitunganPage />} />

        {/* Protected routes */}
        <Route
          path="/data-obat"
          element={
            <ProtectedRoute>
              <DataObatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-gejala"
          element={
            <ProtectedRoute>
              <DataGejalaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kelola-aturan"
          element={
            <ProtectedRoute>
              <KelolaDataPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coba-perhitungan"
          element={
            <ProtectedRoute>
              <CobaPerhitunganPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coba-perhitungan/hasil-rekomendasi"
          element={
            <ProtectedRoute>
              <HasilCobaPerhitunganPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
