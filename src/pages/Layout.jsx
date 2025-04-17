import React, { useState } from "react";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import UbahSandiModal from "../component/modals/UbahSandiModal";
import { AnimatePresence } from "framer-motion";

const Layout = ({ children }) => {
  const [ubahSandiModal, setUbahSandiModal] = useState(false);

  return (
    <React.Fragment>
      <div className="p-0 flex bg-[#F1F1F1]" style={{ minHeight: "100vh" }}>
      <AnimatePresence>
        {ubahSandiModal && (
          <UbahSandiModal onClose={() => setUbahSandiModal(false)} />
        )}
      </AnimatePresence>
        <div className="">
          <div className="flex fixed z-10">
            {/* Kirim fungsi pemicu modal ke Sidebar */}
            <Sidebar onUbahSandi={() => setUbahSandiModal(true)} />
            <Navbar />
          </div>
        </div>

        <div className="flex-1">
          <main className="min-h-screen relative pt-20 sm:pt-5">
            <div className="px-1 sm:pl-72 sm:pr-8">{children}</div>
          </main>
        </div>
      </div>

      {/* Modal ditampilkan DI SINI */}
    
    </React.Fragment>
  );
};

export default Layout;
