import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import batik from "../assets/batik.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faStar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

const Keranjang = () => {
  return (
    <div className="container">
      <div className="container-satu">
        <Navbar />
        <div className="w-full h-full bg-zinc-950 pt-[100px] pb-20">
          <div className="w-[95%] flex justify-between items-center m-auto h-full bg-zinc-900 rounded-lg p-5 gap-7">
            <div className="w-[40%] flex items-center">
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-amber-600 checked:border-amber-600"
                    id="check3"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
                <p className="ml-5 text-slate-100 opacity-65 text-sm">Produk</p>
              </div>
            </div>
            <div className="w-[15%] text-center text-slate-100 opacity-65 text-sm">
              <p>Harga Satuan</p>
            </div>
            <div className="w-[15%] text-center text-slate-100 opacity-65 text-sm">
              <p>Kuantitas</p>
            </div>
            <div className="w-[15%] text-center text-slate-100 opacity-65 text-sm">
              <p>Total Harga</p>
            </div>
            <div className="w-[15%] text-center text-slate-100 opacity-65 text-sm">
              <p>Aksi</p>
            </div>
          </div>
          <div className="w-[95%] flex flex-col m-auto h-full bg-zinc-900 rounded-lg gap-0 mt-5">
          <div className="w-full flex justify-between items-center m-auto h-full bg-zinc-900 p-5 gap-7 border-t border-b border-zinc-800">
            <div className="w-[40%] flex items-center">
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-amber-600 checked:border-amber-600"
                    id="check3"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
                <div className="ml-5 flex items-center gap-2">
                    <img className="w-20" src={batik} alt="" />
                    <h1 className="text-base text-slate-100">Batik Motif Semen</h1>
                </div>
              </div>
            </div>
            <div className="w-[15%] text-center text-slate-100 text-sm">
              <p>Rp. 18.000</p>
            </div>
            <div className="w-[15%] text-center text-slate-100 text-sm">
              <p>2</p>
            </div>
            <div className="w-[15%] text-center text-slate-100 text-sm">
              <p>Rp.32.000</p>
            </div>
            <div className="w-[15%] text-center text-slate-100 text-sm">
              <p>Hapus</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center m-auto h-full bg-zinc-900 p-5 gap-7 border-t border-b border-zinc-800">
            <div className="w-[40%] flex items-center">
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-amber-600 checked:border-amber-600"
                    id="check3"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
                <div className="ml-5 flex items-center gap-2">
                    <img className="w-20" src={batik} alt="" />
                    <h1 className="text-base text-slate-100">Batik Motif Semen</h1>
                </div>
              </div>
            </div>
            <div className="w-[15%] text-center text-slate-100 text-sm">
              <p>Rp. 18.000</p>
            </div>
            <div className="w-[15%] text-center text-slate-100 text-sm">
              <p>2</p>
            </div>
            <div className="w-[15%] text-center text-slate-100 text-sm">
              <p>Rp.32.000</p>
            </div>
            <div className="w-[15%] text-center text-slate-100 text-sm">
              <p>Hapus</p>
            </div>
          </div>
          <div className="w-full flex justify-end items-center p-5">
            <p className="text-base flex items-center gap-1 text-slate-100">Total (0 Produk): <span className="text-xl text-yellow-500">Rp.120.000</span></p>
            <button
                  className="w-[180px] px-5 py-4 bg-yellow-500 text-zinc-900 text-base font-medium rounded-md ml-5"
                  type="button"
                >
                  Checkout
                </button>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Keranjang;
