import "./styles.css";
import { Link } from "react-router-dom";
import { auth } from "@/service/firebase/firebase.config";
import { CiUser } from "react-icons/ci";
import { IoLogOut } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdAddCircle } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useState } from "react";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await auth.signOut();
  };
  return (
    <main className="flex flex-col h-full border border-cor-9F9F9F">
      <div className="closing-menu">
        <div className="flex gap-3 items-center p-3 ">
          {user?.photoURL ? (
            <img src={user.photoURL} className="rounded-2xl w-10" />
          ) : (
            <CiUser className="text-2xl text-cor-9F9F9F" />
          )}

          {user ? (
            <div>
              <p className="font-Poppins font-bold text-black ">
                {user?.displayName}
              </p>
              <p className="font-Poppins font-normal text-sm text-cor-9F9F9F">
                {user?.email}
              </p>
            </div>
          ) : (
            <p className="font-Poppins font-bold text-black">Bem Vindo</p>
          )}
        </div>
        <div className="border-b border-cor-9F9F9F w-[98%] mx-auto"></div>
      </div>

      <nav className="closing-menu flex flex-col p-5 gap-3">
        <Link to={""} className="navigation">
          <IoHomeSharp className="text-xl" /> <span>Inicio</span>
        </Link>
        <Link to={"/product-bag"} className="navigation">
          <FaShoppingCart className="text-xl" /> <span>Carrinho</span>
        </Link>
        <Link to={"/register-product"} className="navigation">
          <IoMdAddCircle className="text-2xl" /> <span>Registrar produtos</span>
        </Link>
        <Link to={"/user"} className="navigation">
          <HiMiniUserCircle className=" text-2xl " /> <span>Perfil</span>
        </Link>
        {user ? (
          <button className="navigation" onClick={handleLogout}>
            <IoLogOut className="text-2xl" /> <span>sair</span>
          </button>
        ) : (
          <Link to={"/login"} className="navigation">
            <FaUser className="text-xl" /> <span>Entre</span>
          </Link>
        )}
      </nav>

      <button
        className="fixed top-3 left-3 z-50 p-3 bg-gray-800 text-white rounded-lg md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? '✖' : '☰'}
      </button>

      {/* Menu Lateral */}
      {isMenuOpen && (
        <nav className='md:hidden fixed top-0 left-0 w-64 h-full bg-gray-800 p-5 w-[300px]'>
          <div className="flex gap-3 items-center p-3">
            {user?.photoURL ? (
              <img src={user.photoURL} className="rounded-2xl w-10" />
            ) : (
              <CiUser className="text-2xl text-cor-9F9F9F" />
            )}

            {user ? (
              <div>
                <p className="font-Poppins font-bold text-white">
                  {user.displayName}
                </p>
                <p className="font-Poppins font-normal text-sm text-cor-9F9F9F">
                  {user.email}
                </p>
              </div>
            ) : (
              <p className="font-Poppins font-bold text-white">Bem Vindo</p>
            )}
          </div>
          <div className="border-b border-cor-9F9F9F w-full mb-4"></div>
          <nav className="flex flex-col gap-3">
            <Link to={"/"} className="navigation text-white hover:bg-blue-800 p-3 rounded-xl" onClick={() => setIsMenuOpen(false)}>
              <IoHomeSharp className="text-xl" /> <span>Inicio</span>
            </Link>
            <Link to={"/product-bag"} className="navigation text-white hover:bg-blue-800 p-3 rounded-xl" onClick={() => setIsMenuOpen(false)}>
              <FaShoppingCart className="text-xl" /> <span>Carrinho</span>
            </Link>
            <Link to={"/register-product"} className="navigation text-white hover:bg-blue-800 p-3 rounded-xl" onClick={() => setIsMenuOpen(false)}>
              <IoMdAddCircle className="text-2xl" /> <span>Registrar produtos</span>
            </Link>
            <Link to={"/user"} className="navigation text-white hover:bg-blue-800 p-3 rounded-xl" onClick={() => setIsMenuOpen(false)}>
              <HiMiniUserCircle className="text-2xl" /> <span>Perfil</span>
            </Link>
            {user ? (
              <button className="navigation text-white hover:bg-blue-800 p-3 rounded-xl" onClick={handleLogout}>
                <IoLogOut className="text-2xl" /> <span>sair</span>
              </button>
            ) : (
              <Link to={"/login"} className="navigation text-white hover:bg-blue-800 p-3 rounded-xl" onClick={() => setIsMenuOpen(false)}>
                <FaUser className="text-xl" /> <span>Entre</span>
              </Link>
            )}
          </nav>
        </nav>
      )}
    </main>
  );
};

export default Navigation;
