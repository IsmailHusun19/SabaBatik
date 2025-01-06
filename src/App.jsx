import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import DetailProduk from './pages/DetailProduk';
import Keranjang from './pages/Keranjang';
import Pesanan from './pages/Pesanan';
import Signup from './pages/SignUp';
import Login from './pages/Login';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/DetailProduk/:id' element={<DetailProduk/>}/>
          <Route path='/Keranjang' element={<Keranjang/>}/>
          <Route path='/Pesanan' element={<Pesanan/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
