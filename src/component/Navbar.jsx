import React, { useState } from "react";
import LogoApp from "../img/sp.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/Firebase";
import { IoIosClose } from "react-icons/io";

const Navbar = () => {
  const [openSidebar, setOpenSideBar] = useState(false);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/beranda");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };


  return (
    <div>
      <div className="">
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`fixed inset-0 flex items-center justify-start z-40 bg-black bg-opacity-60 transition-opacity duration-500 ${
            openSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`absolute z-40 bg-gradient-to-t from-[#0c8e20] to-[#0eae26] w-64 h-[100vh] drop-shadow-lg transform transition-transform duration-500 ${
              openSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="w-full">
              <div className="w-full relative pt-3">
                <button
                  onClick={() => setOpenSideBar(false)}
                  className="absolute top-1 right-2"
                >
                  <IoIosClose color="white" size={30} className="" />
                </button>
                <Link
                  to="/data-obat"
                  className=" text-white rounded-md flex justify-center items-center w-full mt-4 "
                >
                  <img src={LogoApp} className="w-20" alt="" />
                </Link>
              </div>
              <div className="mt-3 grid gap-y-3 px-3">
                <div className="border-b px-2 border-white w-full "></div>
                <Link
                  to="/data-obat"
                  className="rounded-md text-white flex items-center text-sm w-full text-left"
                >
                  Data Obat
                </Link>
                <Link
                  to="/data-gejala"
                  className="rounded-md text-white flex items-center text-sm w-full text-left"
                >
                  Data Gejala
                </Link>
                <Link
                  to="/kelola-data"
                  className="rounded-md text-white flex items-center text-sm w-full text-left"
                >
                  Kelola Data
                </Link>
                {/* <button
                  onClick={() => handleManajemen()}
                  className="rounded-md text-white flex items-center text-sm w-full text-left"
                >
                  Manajemen Akun
                </button> */}
                <button
                  onClick={logout}
                  className="rounded-md text-white flex items-center text-sm w-full text-left"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <div className="sm:hidden bg-[#0c8e20] w-full flex m-0 py-4 z-10 justify-between items-center fixed">
        <div className="flex pl-5 justify-between w-full items-center">
          <div className="flex items-center gap-2">
            <button onClick={() => setOpenSideBar(true)} className="">
              <GiHamburgerMenu color="white" size={20} />
            </button>
            <p className="font-semibold text-white text-[12px]">
              Sistem Rekomendasi Obat Asam Lambung
            </p>
          </div>

          <div className="text-white mx-8 flex items-center gap-2 justify-end">
            <img src={LogoApp} className="flex w-10 sm:w-20" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
