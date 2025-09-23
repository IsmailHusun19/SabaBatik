import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faStar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import useFetchBatik from "../utils/useFetchBatik";
import { getBarangById } from "../services/barangService";
import Produk from "../component/Produk";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


const DetailProduk = () => {
  const navigate = useNavigate();
  const urutanAkun = JSON.parse(localStorage.getItem("urutanAkun"));
  const akunKey = "akun" + urutanAkun;
  let user = JSON.parse(localStorage.getItem(akunKey))
  const { id } = useParams();
  const { batik, error } = useFetchBatik();
  const [barang, setBarang] = useState();
  const [warna, setWarna] = useState(null);
  const [PilihWarna, setPilihWarna] = useState(0);
  const [kain, setKain] = useState(null);
  const [PilihKain, setPilihKain] = useState(0);
  const [size, setSize] = useState(null);
  const [PilihSize, setPilihSize] = useState(0);
  const [idKategori, setIdKategori] = useState("all");
  const [namaKategori, setNamaIdKategori] = useState("All Produk");
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    email: "",
    alamat: "",
    password: "",
    Keranjang: [],
    Pesanan: [],
  });
  const [quantity, setQuantity] = useState(1);
  

  useEffect(() => {
    if (id) {
      setWarna(null);
      setPilihWarna(0);
      setKain(null);
      setSize(null);
      setQuantity(1);
      setPilihKain(0);
    }
  }, [id]);

  useEffect(() => {
    if (batik && id) {
      const barangData = getBarangById(batik, id);
      setBarang(barangData);
    }
  }, [batik, id]);

  const handleOnclickWarna = (index) => {
    if (warna === index) {
      setWarna(null);
    } else {
      setWarna(index);
    }
    if (index === "Dominan Merah Muda") {
      setPilihWarna(0);
    } else if (index === "Dominan Biru") {
      setPilihWarna(1);
    } else if (index === "Dominan Hijau") {
      setPilihWarna(2);
    } else if (index === "Dominan Kuning") {
      setPilihWarna(3);
    } else if (index === "Dominan Jingga") {
      setPilihWarna(4);
    } else if (index === "Dominan Salem") {
      setPilihWarna(5);
    } else {
      setPilihWarna(0);
    }
  };

  useEffect(() => {
    if (warna === null) {
      setPilihWarna(0);
    }
  }, [warna]);


  const handleOnclickKain = (namaKain) => {
    if (namaKain === kain) {
      setKain(null);
    } else {
      setKain(namaKain);
    }
  };
  
  useEffect(() => {
    const hargaKain = {
      "Kain Katun": 0,
      "Kain Mori": 14000,
      "Kain Sutra": 25500,
      "Kain Shantung": 33500,
      "Kain Grey": 47500,
      "Kain Paris": 62500,
      "Kain Ceruty": 73500,
      "Kain Rayon": 89500
    };
  
    if (kain === null) {
      setPilihKain(0);
    } else {
      setPilihKain(hargaKain[kain] || 0);
    }
  }, [kain]);

  const handleOnclickSize = (ukuran) => {
    if (ukuran === size) {
      setSize(null);
    } else {
      setSize(ukuran);
    }
  };
  
  useEffect(() => {
    const hargaUkuran = {
      "M": 0,
      "L": 14000,
      "XL": 25500,
      "XXL": 33500,
    };
  
    if (size === null) {
      setPilihSize(0);
    } else {
      setPilihSize(hargaUkuran[size] || 0);
    }
  }, [size]);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const keranjang = () => {
    const totalHarga = barang.harga * quantity + PilihKain + PilihSize;
    const dataKeranjang = {
      idBarang: id, 
      namaBarang: barang.nama_barang, 
      hargaBarang: barang.harga,
      gambarBarang: barang.warna[PilihWarna].gambar,
      totalHargaBarang: totalHarga,
      warnaBarang: warna,
      jenisKain: kain,
      Ukuran: size,
      jumlah: quantity
    };
    if (Object.values(dataKeranjang).some(value => value === null || value === undefined)) {
      return Swal.fire({
        icon: "error",
        showConfirmButton: false,
        text: "Harap lengkapi pesanan!",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      const urutanAkun = JSON.parse(localStorage.getItem("urutanAkun"));
      const akunKey = "akun" + urutanAkun;
      let akun = JSON.parse(localStorage.getItem(akunKey)) || {
        Keranjang: [],
        Pesanan: [],
      };
      
      if (typeof akun !== "object") {
        akun = { Keranjang: [], Pesanan: [] };
      }
      
      akun.Keranjang.push(dataKeranjang);
      localStorage.setItem(akunKey, JSON.stringify(akun));
      
      setFormData({
        ...formData,
        Keranjang: akun.Keranjang,
      });
      setWarna(null);
      setPilihWarna(0);
      setKain(null);
      setSize(null);
      setQuantity(1);
      setPilihKain(0);
    
    }
  };

  const login = async () => {
    navigate(`/login`);
    window.scrollTo(0, 0);
  };

  const pesanan = () => {
    const totalHarga = barang.harga * quantity + PilihKain + PilihSize;
    const dataPesanan = {
      idBarang: id,
      namaBarang: barang.nama_barang,
      hargaBarang: barang.harga,
      gambarBarang: barang.warna[PilihWarna].gambar,
      totalHargaBarang: totalHarga,
      warnaBarang: warna,
      jenisKain: kain,
      Ukuran: size,
      jumlah: quantity
    };
  
    if (Object.values(dataPesanan).some(value => value === null || value === undefined)) {
      return Swal.fire({
        icon: "error",
        showConfirmButton: false,
        text: "Harap lengkapi pesanan!",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      const urutanAkun = JSON.parse(localStorage.getItem("urutanAkun"));
      const akunKey = "akun" + urutanAkun;
      let akun = JSON.parse(localStorage.getItem(akunKey)) || {
        Keranjang: [],
        Pesanan: [],
      };
  
      if (typeof akun !== "object") {
        akun = { Keranjang: [], Pesanan: [] };
      }
  
      akun.Pesanan.push(dataPesanan);
      localStorage.setItem(akunKey, JSON.stringify(akun));
  
      setFormData({
        ...formData,
        Pesanan: akun.Pesanan,
      });

      setWarna(null);
      setPilihWarna(0);
      setKain(null);
      setSize(null);
      setQuantity(1);
      setPilihKain(0);
      return Swal.fire({
        icon: "success",
        showConfirmButton: false,
        text: "Berhasil cekout!",
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };
  
  return (
    <div className="container">
      <div className="container-satu">
        <Navbar />
        {barang ? (
          <div className="w-full h-full bg-zinc-950 pt-[100px] pb-20">
            <div className="w-[95%] flex m-auto h-full bg-zinc-900 rounded-lg p-5 gap-7">
              <div className="w-max">
                <div>
                  <img
                    className="w-[550px] rounded-md"
                    src={barang.warna[PilihWarna].gambar}
                  />
                </div>
                <div className="flex gap-2 mt-5">
                  <img
                    className="w-[100px] rounded-sm"
                    src={
                      barang.warna[1]
                        ? barang.warna[1].gambar
                        : barang.warna[0].gambar
                    }
                    alt="Warna 1"
                  />

                  <img
                    className="w-[100px] rounded-sm"
                    src={
                      barang.warna[2]
                        ? barang.warna[2].gambar
                        : barang.warna[0].gambar
                    }
                    alt="Warna 2"
                  />

                  <img
                    className="w-[100px] rounded-sm"
                    src={
                      barang.warna[3]
                        ? barang.warna[3].gambar
                        : barang.warna[0].gambar
                    }
                    alt="Warna 3"
                  />
                </div>
              </div>
              <div className="w-full">
                <div>
                  <h1 className="w-full text-3xl text-slate-200 font-medium">
                    {barang.nama_barang}
                  </h1>
                </div>
                <div className="flex items-center w-full mt-1 gap-5">
                  <div className="flex gap-1 items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-[#FFD43B] text-[22px] mt-[-5px]"
                    />
                    <p className="text-slate-100 text-lg">4.7</p>
                  </div>
                  <p className="text-slate-200 text-base text-opacity-65">
                    <span className="text-slate-100 text-opacity-100 text-lg">
                      10K+{" "}
                    </span>
                    Penilaian
                  </p>
                  <p className="text-slate-200 text-base text-opacity-65">
                    <span className="text-slate-100 text-opacity-100 text-lg">
                      10K+{" "}
                    </span>
                    Terjual
                  </p>
                </div>
                <div className="w-full h-14 bg-zinc-800 text-3xl text-yellow-300 font-medium flex items-center p-3 rounded-sm mt-5">
                  Rp.{barang.harga.toLocaleString("id-ID")}
                </div>
                <div className="text-slate-200 text-opacity-65 flex items-center mt-5">
                  <div className="w-[200px]">
                    Pengiriman Dari
                    <FontAwesomeIcon
                      icon={faTruck}
                      className="text-slate-200 opacity-100 ml-2"
                    />
                  </div>
                  <h1 className="text-slate-100 opacity-100 text-base">
                    Pekalogan
                  </h1>
                </div>
                <div className="text-slate-200 text-opacity-65 flex items-center mt-5">
                  <div className="w-[200px] flex-none">Warna</div>
                  <div className="grid grid-cols-3 gap-2 w-full h-full">
                    <div
                      className={`p-3 border border-zinc-600 cursor-pointer ${
                        warna === "Dominan Merah muda"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickWarna("Dominan Merah muda")}
                    >
                      Dominan Merah Muda
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 ${
                        !barang.warna[1]
                        ? "opacity-50 cursor-not-allowed" :
                        warna === "Dominan Biru"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700 cursor-pointer"
                      }`}
                      onClick={!barang.warna[1] ? null : () => handleOnclickWarna("Dominan Biru")}
                    >
                      Dominan Biru
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 ${
                        !barang.warna[2]
                        ? "opacity-50 cursor-not-allowed": 
                        warna === "Dominan Hijau"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700 cursor-pointer"
                      }`}
                      onClick={!barang.warna[1] ? null : () => handleOnclickWarna("Dominan Hijau")}
                    >
                      Dominan Hijau
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 ${
                        !barang.warna[3]
                        ? "opacity-50 cursor-not-allowed" :
                        warna === "Dominan Kuning"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700 cursor-pointer"
                      }`}
                      onClick={!barang.warna[1] ? null : () => handleOnclickWarna("Dominan Kuning")}
                    >
                      Dominan Kuning
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 ${
                        !barang.warna[4]
                        ? "opacity-50 cursor-not-allowed": 
                        warna === "Dominan Jingga"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700 cursor-pointer"
                      }`}
                      onClick={!barang.warna[1] ? null : () => handleOnclickWarna("Dominan Jingga")}
                    >
                      Dominan Jingga
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 ${
                        !barang.warna[5]
                        ? "opacity-50 cursor-not-allowed": 
                        warna === "Dominan Salem"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700 cursor-pointer"
                      }`}
                      onClick={!barang.warna[1] ? null : () => handleOnclickWarna("Dominan Salem")}
                    >
                      Dominan Salem
                    </div>
                  </div>
                </div>
                <div className="text-slate-200 text-opacity-65 flex items-center mt-5">
                  <div className="w-[200px] flex-none">Bahan</div>
                  <div className="grid grid-cols-4 gap-2 w-full h-full">
                    <div
                      className={`p-3 border border-zinc-600 cursor-pointer ${
                        kain === "Kain Katun"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickKain("Kain Katun")}
                    >
                      Kain Katun
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 cursor-pointer ${
                        kain === "Kain Mori"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickKain("Kain Mori")}
                    >
                      Kain Mori
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 cursor-pointer ${
                        kain === "Kain Sutra"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickKain("Kain Sutra")}
                    >
                      Kain Sutra
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 cursor-pointer ${
                        kain === "Kain Shantung"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickKain("Kain Shantung")}
                    >
                      Kain Shantung
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 cursor-pointer ${
                        kain === "Kain Grey"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickKain("Kain Grey")}
                    >
                      Kain Grey
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 cursor-pointer ${
                        kain === "Kain Paris"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickKain("Kain Paris")}
                    >
                      Kain Paris
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 cursor-pointer ${
                        kain === "Kain Ceruty"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickKain("Kain Ceruty")}
                    >
                      Kain Ceruty
                    </div>
                    <div
                      className={`p-3 border border-zinc-600 cursor-pointer ${
                        kain === "Kain Rayon"
                          ? "bg-zinc-700"
                          : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickKain("Kain Rayon")}
                    >
                      Kain Rayon
                    </div>
                  </div>
                </div>
                <div className="text-slate-200 text-opacity-65 flex items-center mt-5">
                  <div className="w-[200px] flex-none">Size</div>
                  <div className="flex gap-2 items-center w-full h-full">
                    <div
                      className={`w-[50px] text-center p-3 border border-zinc-600 cursor-pointer ${
                        size === "M" ? "bg-zinc-700" : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickSize("M")}
                    >
                      M
                    </div>
                    <div
                      className={`w-[50px] text-center p-3 border border-zinc-600 cursor-pointer ${
                        size === "L" ? "bg-zinc-700" : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickSize("L")}
                    >
                      L
                    </div>
                    <div
                      className={`w-[50px] text-center p-3 border border-zinc-600 cursor-pointer ${
                        size === "XL" ? "bg-zinc-700" : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickSize("XL")}
                    >
                      XL
                    </div>
                    <div
                      className={`w-[50px] text-center p-3 border border-zinc-600 cursor-pointer ${
                        size === "XXL" ? "bg-zinc-700" : "hover:bg-zinc-700"
                      }`}
                      onClick={() => handleOnclickSize("XXL")}
                    >
                      XXL
                    </div>
                  </div>
                </div>
                <div className="text-slate-200 text-opacity-65 flex items-center mt-5">
                  <div className="w-[200px] flex-none">Kuanlitas</div>
                  <div className="flex items-center h-full gap-[1px] text-xl">
                    <div
                      className="w-[50px] text-center p-2 border border-zinc-600 cursor-pointer"
                      onClick={decreaseQuantity} // Ketika diklik, akan mengurangi quantity
                    >
                      -
                    </div>
                    <input
                      className="w-[60px] border border-zinc-600 text-zinc-900 text-center p-2 appearance-none focus:outline-none  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      type="number"
                      value={quantity} // Nilai input diikat dengan state quantity
                      onChange={(e) => setQuantity(Number(e.target.value))} // Memperbarui state jika input manual
                    />
                    <div
                      className="w-[50px] text-center p-2 border border-zinc-600 cursor-pointer"
                      onClick={increaseQuantity} // Ketika diklik, akan menambah quantity
                    >
                      +
                    </div>
                  </div>
                  <h1 className="ml-3 text-slate-100 text-opacity-65 text-sm">
                    Tersisa {barang.stok} Buah
                  </h1>
                </div>
                <div className="ml-[200px] flex gap-5 mt-5">
                  <button
                    className="w-[220px] px-5 py-4 bg-yellow-500 text-zinc-900 text-base font-semibold flex items-center gap-1 rounded-md"
                    type="button"
                    onClick={user === null ? () => login() :  () => keranjang()}
                  >
                    Masukan Keranjang{" "}
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-[22px]"
                    />
                  </button>
                  <button
                    className="w-[220px] px-5 py-4 bg-yellow-500 text-zinc-900 text-base font-semibold rounded-md"
                    type="button"
                    onClick={user === null ? () => login() :  () => pesanan()}
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900 w-[95%] m-auto p-5 rounded-lg mt-5">
              <h1 className="text-slate-100 font-medium mb-3 opacity-75 text-lg">
                Deskripsi Produk
              </h1>
              <p className="text-sm text-slate-100 opacity-65 ">
                Kemeja Batik Pria Lengan Panjang motif terbaru keren cocok untuk
                di pakai di mana saja baik acara Resmi\Non Resmi dengan bahan
                kattun Prima sehingga adem & nyaman sa'at di pakai, DETAIL
                PRODUK~ Bahan : KAT-TUN Prima (adem halus dan lembut) Proses
                batik : Printing Warna yang cerah Jahitan : Rapih Catting :
                Regular Saku depan Original Batik Pekalongan Detail size~ M :
                Lingkar dada 104 cm, panjang baju 70cm L : Lingkar dada 108 cm,
                panjang baju 71cm XL : Lingkar dada 112 cm, panjang baju 72cm
                XXL : Lingkar dada 116 cm Panjang baju 74cm Barang Ready ya kak,
                Bisa Langsung di pesan☺️ kami memberikan garansi 100% uang
                kembali, jika barang yang kaka terima tidak sesuai dengan yang
                di pesan s&k berlaku, silahkan videokan unboxing paket sa’at
                membuka paket untuk barang bukti, diskusikan dengan baik-baik
                kepada admin kita, kita pasti akan bertanggung jawab memberikan
                bintang 1/2 kami Blokir 🙏🏼 ~Siap melayani pemesanan -seragam
                kantor\hajatan dll sedikit atau banyak Terimakasih SELAMAT
                BERBELANJA #hembatik #hembatikpria #kemejabatik #kemejabatikpria
                #hembatikmodern #batiklenganpendek{" "}
              </p>
            </div>
            <div className="bg-zinc-900 w-[95%] m-auto p-5 rounded-lg mt-5 mb-20">
              <Produk kodeKategori={idKategori} kategori={namaKategori} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DetailProduk;
