import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <header className="sticky top-0 z-10">
        <Navbar />
      </header>
      {/*  */}
      <main>
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLayout;
