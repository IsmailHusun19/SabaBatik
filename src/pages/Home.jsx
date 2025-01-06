import Navbar from "../component/Navbar";
import model from "../assets/Gamis Pink.jpg";
import bg from "../assets/bg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faStar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Footer from "../component/Footer";
import Kategori from "../component/Kategori";

const Home = () => {
  return (
    <div className="container">
      <div className="container-satu">
        <ParallaxProvider>
          <div style={{ height: "100vh" }}>
            <Parallax
              speed={-30}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
                width: "100%",
                height: "100vh",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></Parallax>

            <Navbar />
            <div className="box-landingpage">
              <div className="box-1-landingpage w-[50%] h-full flex flex-col justify-center relative">
                <h1 className="text-7xl font-black text-yellow-500 mb-2 sabaBatik">
                  SABA BATIK
                </h1>
                <h1 className="text-slate-100 text-base italic">
                  Keindahan Batik, Warisan Budaya Indonesia untuk Dunia,
                  Menampilkan Keindahan dan Tradisi dalam Setiap Pilihan Anda.
                  Pilihlah batik untuk mencerminkan identitas dan kebanggaan
                  budaya Anda.
                </h1>
                <div>
                  <button
                    type="bytoon"
                    className="w-72 rounded-md mt-7 font-bold p-3 bg-yellow-500 text-2xl text-zinc-950 hover:bg-yellow-400"
                  >
                    Buy Now <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                </div>
                <div className="flex gap-14 absolute bottom-5">
                  <div className="flex gap-2 justify-center items-center">
                    <FontAwesomeIcon
                      className="text-yellow-500 text-5xl"
                      icon={faUser}
                    />
                    <div>
                      <h3 className="text-slate-200 font-extrabold text-xl flex flex-col justify-between">
                        29K+
                      </h3>
                      <p className="text-slate-100 text-sm">Customers</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <FontAwesomeIcon
                      className="text-yellow-500 text-5xl"
                      icon={faStar}
                    />
                    <div>
                      <h3 className="text-slate-200 font-extrabold text-xl flex flex-col justify-between">
                        25K+
                      </h3>
                      <p className="text-slate-100 text-sm">Ratings</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <FontAwesomeIcon
                      className="text-yellow-500 text-5xl"
                      icon={faTruck}
                    />
                    <div>
                      <h3 className="text-slate-200 font-extrabold text-xl flex flex-col justify-between">
                        50K+
                      </h3>
                      <p className="text-slate-100 text-sm">Deliverys</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-2-landingpage w-[50%] relative h-full flex flex-col justify-center">
                <div className="box-2-1 absolute right-0 ">
                  <img src={model} alt="" />
                </div>
                <div className="buble"></div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-950 h-max pt-20 pb-5">
            <Kategori/>
          </div>
        </ParallaxProvider>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
