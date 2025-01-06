import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import batik from "../assets/batik.webp";
import iconKeranjang from "../assets/shopping-cart.png";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Keranjang = () => {
  const [keranjang, setKeranjang] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const urutanAkun = JSON.parse(localStorage.getItem("urutanAkun"));
    const akunKey = "akun" + urutanAkun;
    const akun = JSON.parse(localStorage.getItem(akunKey)) || { Keranjang: [] };
    setKeranjang(akun.Keranjang);
    setCheckedItems(akun.Keranjang.map((_, index) => index));
    setSelectAll(true);
  }, []);

  const handleSelectAll = () => {
    const allChecked = !selectAll;
    setSelectAll(allChecked);
    setCheckedItems(allChecked ? keranjang.map((_, index) => index) : []);
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = checkedItems.includes(index)
      ? checkedItems.filter((item) => item !== index)
      : [...checkedItems, index];
    setCheckedItems(updatedCheckedItems);
    setSelectAll(updatedCheckedItems.length === keranjang.length);
  };

  const handleCheckout = () => {
    const urutanAkun = JSON.parse(localStorage.getItem("urutanAkun"));
    const akunKey = "akun" + urutanAkun;
    let akun = JSON.parse(localStorage.getItem(akunKey)) || {
      Keranjang: [],
      Pesanan: [],
    };

    if (typeof akun !== "object") {
      akun = { Keranjang: [], Pesanan: [] };
    }

    // Filter produk yang dipilih
    const selectedProducts = keranjang.filter((_, index) =>
      checkedItems.includes(index)
    );

    // Tambahkan produk yang dipilih ke dalam pesanan
    akun.Pesanan = [...akun.Pesanan, ...selectedProducts];

    // Hapus produk yang dipilih dari keranjang
    const updatedKeranjang = keranjang.filter(
      (_, index) => !checkedItems.includes(index)
    );

    // Update data keranjang dan pesanan di localStorage
    akun.Keranjang = updatedKeranjang;
    localStorage.setItem(akunKey, JSON.stringify(akun));

    // Reset checked items dan keranjang
    setKeranjang(updatedKeranjang);
    setCheckedItems([]);
    setSelectAll(false);

    return Swal.fire({
      icon: "success",
      showConfirmButton: false,
      text: "Berhasil cekout!",
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const totalHargaTercentang = keranjang
    .filter((_, index) => checkedItems.includes(index))
    .reduce((total, item) => total + item.totalHargaBarang, 0);

  const totalProdukTercentang = checkedItems.length;

  function handleHapusItem(index) {
    const updatedKeranjang = keranjang.filter((_, i) => i !== index);
    const urutanAkun = JSON.parse(localStorage.getItem("urutanAkun"));
    const akunKey = "akun" + urutanAkun;
    const akun = JSON.parse(localStorage.getItem(akunKey)) || {};
    akun.Keranjang = updatedKeranjang;
    localStorage.setItem(akunKey, JSON.stringify(akun));
    setKeranjang(updatedKeranjang);
    setCheckedItems(updatedKeranjang.map((_, i) => i));
    setSelectAll(updatedKeranjang.length > 0);
  }


  return (
    <div className="container">
      <div className="container-satu">
        <Navbar />
        {keranjang.length === 0 ? (
          <div className="w-full h-screen bg-zinc-900 pt-[100px] pb-20 flex justify-center items-center flex-col gap-5">
            <img className="w-36 mt-[50px]" src={iconKeranjang} alt="" />
            <h1 className="text-xl text-slate-100">
              Keranjang belanja Anda kosong
            </h1>
          </div>
        ) : (
          <div className="w-full h-full bg-zinc-950 pt-[100px] pb-20">
            <div className="w-[95%] flex justify-between items-center m-auto h-full bg-zinc-900 rounded-lg p-5 gap-7">
              <div className="w-[40%] flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
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
              </div>
              <div className="w-[15%] text-center text-slate-100 opacity-65 text-sm">
                Harga Satuan
              </div>
              <div className="w-[15%] text-center text-slate-100 opacity-65 text-sm">
                Kuantitas
              </div>
              <div className="w-[15%] text-center text-slate-100 opacity-65 text-sm">
                Total Harga
              </div>
              <div className="w-[15%] text-center text-slate-100 opacity-65 text-sm">
                Aksi
              </div>
            </div>
            <div className="w-[95%] flex flex-col m-auto h-full bg-zinc-900 rounded-lg gap-0 mt-5">
              {keranjang.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex justify-between items-center m-auto bg-zinc-900 p-5 gap-7 border-t border-b border-zinc-800"
                >
                  <div className="w-[40%] flex items-center">
                    <label className="flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
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
                      <img className="w-20" src={item.gambarBarang} alt="" />
                      <div>
                        <h1 className="text-base text-slate-100 ">
                          {item.namaBarang}
                        </h1>
                        <p className="text-xs text-slate-300 opacity-100 flex">
                          <span className="w-[60px] flex text-slate-300 opacity-65">
                            Jenis Kain
                          </span>
                          : {item.jenisKain}
                        </p>
                        <p className="text-xs flex text-slate-300 opacity-100">
                          <span className="w-[60px] flex text-slate-300 opacity-65">
                            Warna
                          </span>
                          : {item.warnaBarang}
                        </p>
                        <p className="text-xs flex text-slate-300 opacity-100">
                          <span className="w-[60px] flex text-slate-300 opacity-65">
                            Ukuran
                          </span>
                          : {item.Ukuran}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[15%] text-center text-slate-100 text-sm">
                    <p>
                      {item.hargaBarang.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                  <div className="w-[15%] text-center text-slate-100 text-sm">
                    <p>{item.jumlah}</p>
                  </div>
                  <div className="w-[15%] text-center text-slate-100 text-sm">
                    <p>
                      {item.totalHargaBarang.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                  <div className="w-[15%] text-center text-slate-100 text-sm">
                    <p
                      className="cursor-pointer"
                      onClick={() => handleHapusItem(index)}
                    >
                      Hapus
                    </p>
                  </div>
                </div>
              ))}
              <div className="w-[95%] m-auto flex justify-end items-center py-5">
                <p className="text-base flex items-center gap-1 text-slate-100">
                  Total ({totalProdukTercentang} Produk):{" "}
                  <span className="text-xl text-yellow-500">
                    {totalHargaTercentang.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                </p>
                <button
                  onClick={checkedItems.length === 0 ? null : handleCheckout}
                  
                  className="w-[180px] px-5 py-4 bg-yellow-500 text-zinc-900 text-base font-medium rounded-md ml-5"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Keranjang;
