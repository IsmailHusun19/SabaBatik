import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import iconPesanan from "../assets/pesanan.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Pesanan = () => {
  const [pesanan, setPesanan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const urutanAkun = JSON.parse(localStorage.getItem("urutanAkun"));
    const akunKey = "akun" + urutanAkun;
    const akun = JSON.parse(localStorage.getItem(akunKey)) || { pesanan: [] };
    setPesanan(akun.Pesanan);
  }, []);

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

    if(!data){
      navigate(`/login`);
      window.scrollTo(0, 0);
    }

  return (
    <div className="container">
      <div className="container-satu">
        <Navbar />
        {pesanan.length === 0 ? (
          <div className="w-full h-screen bg-zinc-900 pt-[100px] pb-20 flex justify-center items-center flex-col">
            <img className="w-36 mt-[50px]" src={iconPesanan} alt="" />
            <h1 className="text-xl text-slate-100">
              Pesanan belanja Anda kosong
            </h1>
          </div>
        ) : (
          <div className="w-full h-full bg-zinc-950 pt-[100px] pb-20">
            <div className="w-[95%] flex justify-between items-center m-auto h-full bg-zinc-900 rounded-lg p-5 gap-7">
              <div className="w-[40%] flex items-center">
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
                Status
              </div>
            </div>
            <div className="w-[95%] flex flex-col m-auto h-full bg-zinc-900 rounded-lg gap-0 mt-5">
              {pesanan.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex justify-between items-center m-auto bg-zinc-900 p-5 gap-7 border-t border-b border-zinc-800"
                >
                  <div className="w-[40%] flex items-center">
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
                    >
                      Dikirim
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Pesanan;
