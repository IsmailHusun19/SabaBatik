import { useEffect } from "react";
import { useState } from "react";
import Produk from "./Produk";

const Kategori = () => {
  const [kategori, setKategori] = useState([]);
  const [idKategori, setIdKategori] = useState("all");
  const [namaKategori, setNamaIdKategori] = useState("All Produk");


  useEffect(() => {
    fetch("/Ketegori.json")
      .then((response) => response.json())
      .then((data) => setKategori(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  const handleKategoriClick = (data) => {
    if (idKategori === data.kode) {
      setIdKategori("all");
      setNamaIdKategori("All Produk")
    } else {
      setIdKategori(data.kode);
      setNamaIdKategori(data.nama_kategori)
    }
  };

  

  return (
    <>
      <div className="bg-zinc-900 w-[95%] m-auto p-5 rounded-lg ">
        <h1 className="text-slate-100 font-medium font-lg opacity-80 text-xl mb-3">
          KATEGORI
        </h1>
        <div className="flex gap-1 justify-between items-center">
          {kategori.map((data) => (
            <div
              className={`flex flex-col border justify-center items-center border-zinc-700 text-center p-2 cursor-pointer w-full rounded-md ${
                idKategori === data.kode ? "bg-zinc-700" : "hover:bg-zinc-700"
              }`}
              key={data.kode}
              onClick={() => handleKategoriClick(data)}
            >
              <img className="w-24 h-24 bg-yellow-500 rounded-full" src={data.gambar} alt="Batik Motif" />
              <p className="text-slate-200 text-sm font-medium h-[40px] mt-1">
                {data.nama_kategori}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-zinc-900 w-[95%] m-auto p-5 rounded-lg mt-5 mb-20">
        <Produk kodeKategori={idKategori} kategori={namaKategori} />
      </div>
    </>
  );
};

export default Kategori;
