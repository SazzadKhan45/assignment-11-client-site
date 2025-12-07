import HeroSlider from "../../Components/HeroSlider/HeroSlider";
import HomePageProducts from "../../Components/HomePageProducts/HomePageProducts";
import WorksStep from "../../Components/WorksStep/WorksStep";
import useTheme from "../../Hooks/useTheme";

const Home = () => {
  const { isDark } = useTheme();
  return (
    <div className={`py-12 ${isDark ? "bg-gray-900" : "bg-amber-50"}`}>
      <header>
        <HeroSlider />
      </header>
      {/*  */}
      <main>
        {/* Dynamic data loaded Component */}
        <HomePageProducts />

        {/* How to works step by step */}
        <WorksStep />
      </main>
    </div>
  );
};

export default Home;
