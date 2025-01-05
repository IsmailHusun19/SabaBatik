import { useNavigate } from 'react-router-dom';
import useFetchBatik from "../utils/useFetchBatik"; // Sesuaikan path
import { getBarangByKategori } from "../services/barangService"; // Import layanan

const Produk = ({ kodeKategori, kategori }) => {
  const navigate = useNavigate();
  const { batik, error } = useFetchBatik();
  
  const barang = getBarangByKategori(batik, kodeKategori);
  const handleOnclick = (data) => {
    navigate(`/DetailProduk/${data.kode_barang}`);
    window.scrollTo(0, 0);
  };

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <>
      <h1 className="text-slate-100 font-medium font-lg opacity-80 text-xl mb-3">
        {kategori.toUpperCase()}
      </h1>
      <div className="gap-1 items-center flex-wrap grid grid-cols-5">
        {barang.map((barang, index) => (
          <div
            className="flex mb-1 flex-col border justify-center items-center border-zinc-700 text-center cursor-pointer w-56 rounded-md hover:border-2 hover:border-zinc-600"
            key={`${barang.kode_barang}-${index}`}
            onClick={() => handleOnclick(barang)}
          >
            <img
              className="w-full rounded-tl-md rounded-tr-md"
              src={barang.warna[0].gambar}
              alt={barang.nama_barang}
            />
            <p className="text-slate-200 text-sm font-medium mt-4 w-full text-left px-2">
              {barang.nama_barang}
            </p>
            <div className="w-full text-left p-2">
              <h1 className="text-lg text-yellow-500 font-medium">
                <span className="text-sm">Rp.</span> {barang.harga.toLocaleString("id-ID")}
              </h1>
            </div>
            <div className="flex justify-between w-full pt-1 pb-2 px-2">
              <div className="flex gap-1 items-center">
                <p className="text-slate-200 mt-1 text-sm">{barang.rating}</p>
              </div>
              <p className="text-slate-200 text-sm">{barang.stok}+ Terjual</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Produk;