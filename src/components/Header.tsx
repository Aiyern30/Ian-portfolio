"use client";

import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import React, { useState } from "react";

interface HeaderProps {
  activeSection?: string; // This can be more specific if you have predefined sections
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className=" fixed top-0 left-0 right-0 bg-secondary font-primary text-white p-5 text-xl z-50">
      <div className=" flex justify-between items-center">
        <Link href="/" className="text-[20px] lg:text-[32px] font-semibold">
          <div>Ian's Portfolio</div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="block lg:hidden text-xl px-4 py-2 hover:outline-none"
          onClick={toggleMenu}
        >
          <FiMenu />
        </button>

        {/* Menu Items */}
        <div className={`hidden lg:flex lg:items-center lg:w-auto`}>
          <ul className="flex lg:flex-row lg:space-x-14 text-[18px] lg:items-center">
            <li
              className={`hover:text-blue-500 hover:font-semibold ${
                activeSection === "home" ? "text-blue-500" : ""
              }`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`hover:text-blue-500 hover:font-semibold ${
                activeSection === "tools" ? "text-blue-500" : ""
              }`}
            >
              <Link href="#tools">Tools</Link>
            </li>
            <li
              className={`hover:text-blue-500 hover:font-semibold ${
                activeSection === "projects" ? "text-blue-500" : ""
              }`}
            >
              <Link href="#projects">Projects</Link>
            </li>
            <li
              className={`hover:text-blue-500 hover:font-semibold ${
                activeSection === "certs" ? "text-blue-500" : ""
              }`}
            >
              <Link href="#certs">Certs</Link>
            </li>
            <li
              className={`hover:text-blue-500 hover:font-semibold ${
                activeSection === "about" ? "text-blue-500" : ""
              }`}
            >
              <Link href="#about">About</Link>
            </li>
            <li
              className={`hover:text-blue-500 hover:font-semibold ${
                activeSection === "support-me" ? "text-blue-500" : ""
              }`}
            >
              <Link href="#support-me">Support Me</Link>
            </li>

            <li
              className={`hover:text-blue-500 hover:font-semibold ${
                activeSection === "contact-us" ? "text-blue-500" : ""
              }`}
            >
              <Link href="#contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Items */}
      <div className={`${isMenuOpen ? "block" : "hidden"} lg:hidden mt-4`}>
        <ul className="flex flex-col space-y-4 text-[18px]">
          <li
            className={`hover:text-blue-500 hover:font-semibold ${
              activeSection === "home" ? "text-blue-500" : ""
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`hover:text-blue-500 hover:font-semibold ${
              activeSection === "tools" ? "text-blue-500" : ""
            }`}
          >
            <Link href="#tools">Tools</Link>
          </li>
          <li
            className={`hover:text-blue-500 hover:font-semibold ${
              activeSection === "projects" ? "text-blue-500" : ""
            }`}
          >
            <Link href="#projects">Projects</Link>
          </li>
          <li
            className={`hover:text-blue-500 hover:font-semibold ${
              activeSection === "certs" ? "text-blue-500" : ""
            }`}
          >
            <Link href="#certs">Certs</Link>
          </li>
          <li
            className={`hover:text-blue-500 hover:font-semibold ${
              activeSection === "about" ? "text-blue-500" : ""
            }`}
          >
            <Link href="#about">About</Link>
          </li>
          <li
            className={`hover:text-blue-500 hover:font-semibold ${
              activeSection === "support-me" ? "text-blue-500" : ""
            }`}
          >
            <Link href="#support-me">Support Me</Link>
          </li>
          <li
            className={`hover:text-blue-500 hover:font-semibold ${
              activeSection === "contact-us" ? "text-blue-500" : ""
            }`}
          >
            <Link href="#contact-us">Contact Us</Link>
          </li>
          <li
            className={`hover:text-blue-500 hover:font-semibold ${
              activeSection === "Journey" ? "text-blue-500" : ""
            }`}
          >
            <Link href="/Journey">Journey</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
