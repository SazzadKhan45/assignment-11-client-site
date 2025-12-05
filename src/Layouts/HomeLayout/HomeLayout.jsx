import Navbar from "../../Components/Navbar/Navbar";
import Home from "../../Pages/Home/Home";

const HomeLayout = () => {
  return (
    <div>
      {/*  */}
      <header className="sticky top-0 z-10">
        <Navbar />
      </header>

      {/*  */}
      <main>
        <Home />
      </main>

      {/*  */}
      <footer></footer>
    </div>
  );
};

export default HomeLayout;
