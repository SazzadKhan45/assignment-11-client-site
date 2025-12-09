import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import MyContainer from "../MyContainer/MyContainer";
import useTheme from "../../Hooks/useTheme";

const reviews = [
  {
    id: 1,
    name: "John Smith",
    img: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    comment: "Amazing product! Quality is excellent and delivery was fast.",
  },
  {
    id: 2,
    name: "Emily Johnson",
    img: "https://i.pravatar.cc/100?img=2",
    rating: 4,
    comment: "Good value for money. I really like the material.",
  },
  {
    id: 3,
    name: "Michael Lee",
    img: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    comment: "Perfect fit and comfortable. Highly recommended!",
  },
  {
    id: 4,
    name: "Sarah Williams",
    img: "https://i.pravatar.cc/100?img=4",
    rating: 4,
    comment: "Very stylish and well-made. Will order again.",
  },
  {
    id: 5,
    name: "David Brown",
    img: "https://i.pravatar.cc/100?img=5",
    rating: 5,
    comment: "Excellent fabric quality. Loved it!",
  },
  {
    id: 6,
    name: "Sophia Miller",
    img: "https://i.pravatar.cc/100?img=6",
    rating: 4,
    comment: "Looks great! Slightly late delivery but worth it.",
  },
  {
    id: 7,
    name: "James Wilson",
    img: "https://i.pravatar.cc/100?img=7",
    rating: 5,
    comment: "Fantastic service and product is just wow!",
  },
  {
    id: 8,
    name: "Olivia Davis",
    img: "https://i.pravatar.cc/100?img=8",
    rating: 5,
    comment: "Loved the design! Exactly as shown.",
  },
];

const CustomerReviews = () => {
  const { isDark } = useTheme();

  return (
    <div className="my-12">
      <MyContainer>
        <div className="px-2 md:px-0 mb-8">
          <h2 className="text-2xl md:text-4xl font-medium text-center">
            Customer Reviews
          </h2>
          <p className="text-center text-gray-500 md:px-8 lg:px-60 mt-2">
            Customer Reviews" are authentic feedback and star ratings shared by
            verified buyers about their experience with a product or service
          </p>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 6000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Autoplay, Pagination]}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div
                className={`p-4 mb-12 cursor-pointer shadow rounded-xl border dark:border-gray-700 h-[130px] ${
                  isDark ? "bg-gray-500" : "bg-secondary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{review.name}</h3>
                    <p className="text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {review.comment}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </MyContainer>
    </div>
  );
};

export default CustomerReviews;
