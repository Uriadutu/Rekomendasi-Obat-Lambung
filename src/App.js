import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/userPage/HomePage";
import DataObatPage from "./pages/DataObatPage";
import Splash from "./component/user/Splash";
import Login from "./component/Login";
import DataGejalaPage from "./pages/DataGejalaPage";
import KelolaDataPage from "./pages/KelolaDataPage";
import HasilPerhitunganPage from "./pages/userPage/HasilPerhitunganPage";
import Tess from "./pages/tes";





function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/tes" element={<Tess />} />
          <Route path="/" element={<Splash />} />
          <Route path="/beranda" element={<HomePage />} />
          <Route path="/masuk" element={<Login />} />
          <Route path="/data-obat" element={<DataObatPage/>} />
          <Route path="/data-gejala" element={<DataGejalaPage/>} />
          <Route path="/kelola-data" element={<KelolaDataPage/>} />
          <Route path="/hasil-perhitungan" element={<HasilPerhitunganPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
