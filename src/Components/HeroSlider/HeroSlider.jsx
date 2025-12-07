import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import MyContainer from "../MyContainer/MyContainer";

const slides = [
  {
    id: 1,
    title: "Fast & Reliable Delivery",
    subtitle: "Get your products delivered on time, every time",
    image: "https://i.ibb.co.com/fYLfyX9X/delivery-bg.png",
  },
  {
    id: 2,
    title: "Premium Quality Products",
    subtitle: "Direct from trusted manufacturers",
    image: "https://i.ibb.co.com/sdfk1RwV/factory.avif",
  },
  {
    id: 3,
    title: "Buyer with Trust Products",
    subtitle: "Best prices for buyers worldwide",
    image: "https://i.ibb.co.com/33MvkZh/buyer-1.png",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === slides.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? slides.length - 1 : prev - 1;
    });
  };

  // Auto-play every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <MyContainer>
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[680px] overflow-hidden rounded">
          {/* Slider */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset }) => {
                if (offset.x > 100) paginate(-1);
                else if (offset.x < -100) paginate(1);
              }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slides[currentIndex].image})`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-gray-700 via-gray-700/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="max-w-2xl text-white"
                  >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                      {slides[currentIndex].title}
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light">
                      {slides[currentIndex].subtitle}
                    </p>
                    <div className="flex gap-4">
                      <button className="px-8 py-2.5 bg-[#E5C38B] hover:bg-[#c2a67a] text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-95">
                        Explore Now
                      </button>
                      <button className="px-8 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/50 text-white font-semibold rounded-lg transition hover:scale-95">
                        Learn More
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition"
          >
            <MdKeyboardArrowLeft className="w-8 h-8 text-white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition"
          >
            <MdKeyboardArrowRight className="w-8 h-8 text-white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-white w-12"
                    : "bg-white/50 w-3 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </MyContainer>
    </div>
  );
}
