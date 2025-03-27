// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";

import bgimg1 from "../assets/images/carousel1.jpg";
import bgimg2 from "../assets/images/carousel2.jpg";
import bgimg3 from "../assets/images/carousel3.jpg";
import { Link } from "react-router-dom";
import TestButtonA from "./TestButtonA";

export default function Carousel() {
  return (
    <div className="container px-6 py-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center relative w-full">
            <Slide image={bgimg1} text="ঢাকার স্বাদ এবার আপনার থালায়!" />

            <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 z-10 p-2 ">
              <TestButtonA 
              text="কাচা কাঁঠাল"/>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="flex flex-col justify-center items-center relative w-full">
            <Slide
            image={bgimg2}
            text="Love at first bite - Bangladeshi flavors like no other."
          />
          <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 z-10 ">
              <TestButtonA 
              text="ডিম চপ"/>
            </div>
            </div>
          
        </SwiperSlide>
        <SwiperSlide>
            <div className="flex flex-col justify-center items-center relative w-full">
            <Slide
            image={bgimg3}
            text="Spice up your day with our Bangladeshi delicacies."
          />
          <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 z-10 ">
              <TestButtonA 
              text="মাছের ঝোল"/>
            </div>
            </div>
          
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
