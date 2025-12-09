import CustomerReviews from "../../Components/CustomerReviews/CustomerReviews";
import HeroSlider from "../../Components/HeroSlider/HeroSlider";
import HomePageProducts from "../../Components/HomePageProducts/HomePageProducts";
import JoiningBonus from "../../Components/JoiningBonus/JoiningBonus";
import WorkingBands from "../../Components/WorkingBands/WorkingBands";
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

        {/* Garments Brands */}
        <WorkingBands />

        {/* Joining Bonus */}
        <JoiningBonus />

        {/* Buyer & Manger reviews */}
        <CustomerReviews />
      </main>
    </div>
  );
};

export default Home;
