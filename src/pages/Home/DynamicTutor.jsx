import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../utilities/Loader";
import { Link } from "react-router";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

const DynamicTutor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // start as true
  const role = "tutor";
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await axiosSecure(`/dynamicTutorPost/${role}`);
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading tutors:", error);
        setLoading(false);
      }
    };
    loadData();
  }, [axiosSecure, role]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4 my-30">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center font-bold my-8 lg:my-12 text-3xl md:text-4xl lg:text-5xl text-slate-800">
          Our New Tutors
        </h1>

        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {data.map((tutor) => (
            <SwiperSlide key={tutor._id}>
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-slate-200 h-full">
                <div className="p-6">
                  <div className="flex justify-center items-center mb-5 border-2 border-blue-500 bg-blue-500 rounded-4xl">
                    <img
                      className="rounded-full"
                      src={tutor.Image_URL}
                      alt=""
                    />
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                      Name: {tutor.name}
                    </h3>
                    <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                  </div>
                  <div className="space-y-3 text-slate-600">
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">
                        Email:
                      </span>
                      {tutor.email}
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">
                        Phone Number:
                      </span>
                      <span className="text-green-600 font-medium">
                        {tutor.phoneNumber}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/all-tutor"
          className="btn btn-lg bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg text-center "
        >
          View All Tutors
        </Link>
      </div>
    </div>
  );
};

export default DynamicTutor;
