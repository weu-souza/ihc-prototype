import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  
  return (
    <>
    <ToastContainer />
    <main className="md:grid md:grid-cols-[250px_auto]">
       <Navigation />
       <Outlet/>
    </main>
    </>
  );
}
