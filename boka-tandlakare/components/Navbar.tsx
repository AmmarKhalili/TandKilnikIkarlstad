"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Ikoner för hamburgrmeny
import { FaTooth } from "react-icons/fa"; // Tand-ikon för logo

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State för att hålla koll på om menyn är öppen eller stängd

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle-menyn när ikonen klickas
  };

  return (
    <nav className="bg-white text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo i vänster */}
        <Link href="/" className="flex items-center">
        <div className="text-[#007bff] mr-2">
                <FaTooth size={30} />
              </div> {/* Tand-ikon */}
          <div className="text-2xl font-bold">
            <span className="text-[#0056b3]">Tand</span>
            <span className="text-[#007bff]">kliniken</span>
          </div>
        </Link>

        {/* Meny för stora skärmar */}
        <div className="hidden md:flex flex-grow justify-center space-x-6">
          <Link
            href="/"
            className="relative group hover:text-[#007bff] transition-colors duration-300 mb-2" // Lagt till mb-2 för mellanrum
          >
            Home
            {/* Understrykning vid hovring */}
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-[#007bff] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/om-oss"
            className="relative group hover:text-[#007bff] transition-colors duration-300 mb-2" // Lagt till mb-2 för mellanrum
          >
            Om oss
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-[#007bff] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/kontakt"
            className="relative group hover:text-[#007bff] transition-colors duration-300 mb-2" // Lagt till mb-2 för mellanrum
          >
            Kontakta
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-[#007bff] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Boka en tid-knappen  */}
        <div className="hidden md:block ml-6">
          <Link href="/boka">
            <button className="bg-[#007bff] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#0056b3] transition">
              Boka en tid
            </button>
          </Link>
        </div>

        {/* Hamburgermeny för mobila enheter */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FiX size={30} /> // Visa X-ikonen när menyn är öppen
          ) : (
            <FiMenu size={30} /> // Visa hamburgermenyn när den är stängd
          )}
        </div>
      </div>

      {/* Meny för mobila enheter (visas när menyn är öppen) */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden flex flex-col items-center mt-4 space-y-4 bg-[#007bff] py-4`}
      >
        <Link href="/boka" className="text-lg text-white hover:underline ">
          Boka en tid
        </Link>
        <Link href="/" className="text-lg text-white hover:underline">
          Home
        </Link>
        <Link href="/om-oss" className="text-lg text-white hover:underline">
          Om oss
        </Link>
        <Link href="/kontakt" className="text-lg text-white hover:underline">
          Kontakta
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;