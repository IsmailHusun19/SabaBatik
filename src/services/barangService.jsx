export const getAllBarang = (batikData) => {
    // Menggabungkan semua barang dari setiap kategori
    return batikData.flatMap(kategori => kategori.barang);
  };
  
  export const getBarangByKategori = (batikData, kodeKategori) => {
    // Ambil semua barang dari kategori All (semua kategori dengan kode_kategori "All")
    const allBarang = batikData
      .filter((kategori) => kategori.kode_kategori === "All")
      .flatMap((kategori) => kategori.barang);
  
    // Ambil barang dari kategori yang dipilih (misalnya K001)
    const barangKategori =
      kodeKategori === "all"
        ? batikData.flatMap((kategori) => kategori.barang)
        : batikData.find((kategori) => kategori.kode_kategori === kodeKategori)?.barang || [];  // Jika tidak "all", ambil barang dari kategori yang dipilih
  
    // Membuat Set untuk kode_barang dari barangKategori yang dipilih
    const barangKategoriKod = new Set(barangKategori.map((item) => item.kode_barang));
  
    // Mengambil barang dari kategori "All" yang belum ada di kategori lain
    const filteredAllBarang = allBarang.filter((item) => !barangKategoriKod.has(item.kode_barang));
  
    // Gabungkan barang dari kategori yang dipilih dengan barang dari kategori "All" yang belum ada
    return [...barangKategori, ...filteredAllBarang];
  };
  
  
  
  
  export const getBarangById = (batikData, idBarang) => {
    for (const kategori of batikData) {
      const barang = kategori.barang.find(item => item.kode_barang === idBarang);
      if (barang) {
        return barang;
      }
    }
    return null;  // Jika barang tidak ditemukan
  };  