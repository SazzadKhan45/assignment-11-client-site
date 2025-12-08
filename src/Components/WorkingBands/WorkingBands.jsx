import MyContainer from "../MyContainer/MyContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import a from "../../assets/Brands/barnd-1.png";
import b from "../../assets/Brands/barnd-2.png";
import c from "../../assets/Brands/barnd-3.png";
import d from "../../assets/Brands/barnd-4.png";
import e from "../../assets/Brands/barnd-5.png";
import f from "../../assets/Brands/barnd-6.png";
import g from "../../assets/Brands/barnd-7.png";

// Put images in public/brands/ folder
const brandsLogos = [a, b, c, d, e, f, g];

const WorkingBrands = () => {
  return (
    <div className="mt-12 px-2 md:px-0">
      <MyContainer>
        <div className="px-2 md:px-0">
          <h2 className="text-2xl md:text-4xl font-medium text-center">
            Recent Join Us Brands
          </h2>
          <p className="text-center text-gray-500 md:px-8 lg:px-60 mt-2">
            High-quality, stylish clothing designed for comfort, fashion, and
            everyday wear.
          </p>
        </div>

        <Swiper
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          speed={1000}
          modules={[Autoplay]}
          className="mt-10"
        >
          {brandsLogos.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center w-full h-32 px-4 border rounded-2xl">
                <img
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  className="max-w-full max-h-full object-contain hover:grayscale transition-all duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </MyContainer>
    </div>
  );
};

export default WorkingBrands;
