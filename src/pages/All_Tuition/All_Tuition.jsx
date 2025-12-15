import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../../providers/AuthContext";
import Loader from "../../utilities/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const All_Tuition = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 3;

  useEffect(() => {
    const loadData = async () => {
      const result = await axiosSecure(
        `/allTuitions?limit=${limit}&skip=${currentPage * limit}`
      );
      setData(result.data.result);
      setTotalData(result.data.total);
      const page = Math.ceil(totalData / limit);
      setTotalPage(page);
      //console.log("result",result.data)
      //console.log("total data",result.data.total)
    };
    loadData();
  }, [user, axiosSecure, totalData, currentPage]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mb-20">
      <h1 className="text-center font-bold my-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        ALL TUITIONS
      </h1>
      <h1>Total Tuition ({totalData})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 lg:p-5 xl:p-7 gap-10 lg:gap-15 py-5">
        {data.map((tuition) => (
          <div
            key={tuition._id}
            className="card w-96 bg-base-100 card-lg shadow-sm"
          >
            <div className="card-body">
              <h2 className="card-title">Class: {tuition.Class}</h2>
              <p>Subjects: {tuition.Subjects}</p>
              <p>Budget: {tuition.Budget}</p>
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

      {/* Page Number */}
      <div>
        {currentPage > 0 && (
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            className="join-item btn btn-outline"
          >
            Previous
          </button>
        )}

        {[...Array(totalPage).keys()].map((index) => (
          <div
            onClick={() => {
              setCurrentPage(index);
            }}
            className="join"
          >
            <input
              className={`join-item btn ${
                index === currentPage && "btn-primary"
              } btn-square`}
              value={index+1}
              name="options"
            />
          </div>
        ))}

        {currentPage < totalPage-1 && (
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            className="join-item btn btn-outline"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default All_Tuition;
