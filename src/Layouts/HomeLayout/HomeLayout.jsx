import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const HomeLayout = () => {
  return (
    <div>
      {/*  */}
      <header className="sticky top-0 z-100">
        <Navbar />
      </header>

      {/*  */}
      <main>
        <Outlet />
      </main>

      {/*  */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
