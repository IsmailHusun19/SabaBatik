import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faX,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const menuNavigasi = [
  { name: "Home", link: "/" },
  { name: "Produk", link: "/matakuliah" },
  { name: "Tentang Kami", link: "/services" },
  { name: "Contact", link: "/editor" },
];

const Navbar = () => {
  const [data, setData] = useState(false);
  useEffect(() => {
    const checkUrutan = async () => {
      const urutan = localStorage.getItem("urutanAkun");
      if (urutan) {
        setData(true);
        console.log(data);
      } else {
        setData(false);
        console.log(data);
      }
    };
    checkUrutan();
  }, [data]);

  const handleSetData = (data) => {
    setUserData(data);
    if (data) {
      localStorage.setItem("status", true);
    } else {
      localStorage.setItem("status", false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {};

  return (
    <div className="container-navbar text-slate-200">
      <div className="navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="list">
          <ul className="ulClose">
            {menuNavigasi.map((item, index) => (
              <li key={index}>
                <Link className="text-xl" to={item.link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="loginActiveResponsive">
          <div>
            <div className="relative font-[sans-serif] w-max mx-auto font-semibold text-[14px]">
              {data ? (
                <div>
                  <div className="relative font-[sans-serif] w-max mx-auto">
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="px-4 py-2 flex items-center rounded-full text-slate-100 text-sm border border-gray-300 outline-none"
                    >
                      <img
                        src="https://readymadeui.com/profile_6.webp"
                        className="w-7 h-7 mr-3 rounded-full shrink-0"
                        alt="Profile"
                      />
                      <h1 className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[10ch] lg:max-w-max">
                        ismail
                      </h1>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 fill-gray-400 inline ml-3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <ul className="absolute block shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto">
                        <li
                          onClick={handleLogout}
                          className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer gap-3"
                        >
                          <FontAwesomeIcon
                            className="text-[#333] w-5"
                            icon={faArrowRightFromBracket}
                          />
                          Logout
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
