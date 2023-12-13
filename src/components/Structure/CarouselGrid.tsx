import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarouselGrid: React.FC = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {/* Replace with your carousel grid items */}
      <SwiperSlide>Item 1</SwiperSlide>
      <SwiperSlide>Item 2</SwiperSlide>
      <SwiperSlide>Item 3</SwiperSlide>
      <SwiperSlide>Item 4</SwiperSlide>
      <SwiperSlide>Item 5</SwiperSlide>
      {/* Add more slides as needed */}
    </Swiper>
  );
};

export default CarouselGrid;
