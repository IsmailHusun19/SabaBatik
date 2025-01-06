import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const menuNavigasi = [
  { name: "Home", link: "/" },
  { name: "Produk", link: "/#produk" },
  { name: "Pesanan", link: "/Pesanan" },
  { name: "Contact Me", link: "/" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const urutanAkun = JSON.parse(localStorage.getItem("urutanAkun"));
  const akunKey = "akun" + urutanAkun;
  const akun = JSON.parse(localStorage.getItem(akunKey)) || {
    Keranjang: [],
    Pesanan: [],
  };
  const jumlahItemDiKeranjang = akun.Keranjang.length;
  const user = JSON.parse(localStorage.getItem(akunKey));
  const [data, setData] = useState(false);
  useEffect(() => {
    const checkUrutan = async () => {
      const urutan = localStorage.getItem("urutanAkun");
      if (urutan) {
        setData(true);
      } else {
        setData(false);
      }
    };
    checkUrutan();
  }, [data]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    localStorage.removeItem("urutanAkun");
    setData(false);
    navigate(`/`);
    window.scrollTo(0, 0);
  };

  const handleKeranjang = () => {
    navigate(`/Keranjang`);
    window.scrollTo(0, 0);
  };

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
                  <div className="relative font-[sans-serif] w-max mx-auto flex items-center gap-7">
                    <div
                      className="relative h-[40px] cursor-pointer mt-[9px] flex justify-center items-center"
                      onClick={() => handleKeranjang()}
                    >
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className="text-[22px]"
                      />
                      <div
                        className={`h-5 w-5 absolute top-[-3px] right-[-5px] rounded-full ${
                          jumlahItemDiKeranjang === 0
                            ? "bg-transparent"
                            : "bg-yellow-500"
                        }`}
                      >
                        <h2 className="text-sm text-center text-slate-200">
                          {jumlahItemDiKeranjang === 0
                            ? ""
                            : jumlahItemDiKeranjang}
                        </h2>
                      </div>
                    </div>
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
                        {user.name}
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
                      <ul className="absolute right-0 block shadow-lg bg-white py-2 z-[1000] w-[190px] mt-28 rounded-lg max-h-96 overflow-auto">
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
