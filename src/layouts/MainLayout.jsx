import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="font-Poppins bg-stone-200">
      <header>
        <NavTop />
        <Navbar />
      </header>

      <main className="min-h-[calc(100vh-370px)] ">
        <Outlet />
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
