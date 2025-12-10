import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../../providers/AuthContext";
import Loader from "../../utilities/Loader";

const All_Tuition = () => {
  const { user, loading } = use(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("http://localhost:3000/allTuitions");
      const result = await res.json();
      setData(result);
    };
    loadData();
  }, [user, data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mb-20">
      <h1 className="text-center font-bold my-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        ALL TUITIONS
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 lg:p-5 xl:p-7 gap-10 lg:gap-15 py-5">
        {data.map((tuition) => (
          <div
            key={tuition._id}
            className="card bg-base-100 w-full lg:w-11/12 lg:mx-auto shadow-lg hover:shadow-2xl"
          >
            <figure className="p-7">
              
            </figure>
            <div className="card-body px-10 mt-5">
              <div className="flex items-center gap-2">
                {/* <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                    <img src={tuition.donatorImage} alt="" />
                  </div>
                </div> */}
                <h1 className="font-bold text-xl">Class: {tuition.Class}</h1>
              </div>
              <h2 className="card-title font-bold text-lg">Subjects: {tuition.Subjects}</h2>
              <h2 className="font-bold text-sm">Budget: {tuition.Budget}</h2>
              <h2 className="font-bold text-sm">
                Location: {tuition.Location}
              </h2>
              <div className="card-actions">
                <Link
                  to={`/all-tuition/${tuition._id}`}
                  className="btn bg-[#DC143C] text-white font-bold rounded-xl"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All_Tuition;
