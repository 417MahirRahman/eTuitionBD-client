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
  const [order, setOrder] = useState("-1");
  const [searchValue, setSearchValue] = useState("");
  const limit = 3;

  useEffect(() => {
    const loadData = async () => {
      const result = await axiosSecure(
        `/allTuitions?limit=${limit}&skip=${
          currentPage * limit
        }&order=${order}&search=${searchValue}`
      );
      setData(result.data.result);
      setTotalData(result.data.total);
      const page = Math.ceil(totalData / limit);
      setTotalPage(page);
      //console.log("result",result.data)
      //console.log("total data",result.data.total)
    };
    loadData();
  }, [user, axiosSecure, totalData, currentPage, order, searchValue]);

  if (loading) {
    return <Loader />;
  }

  //Sort By Function
  const handleSorting = (e) => {
    setOrder(e.target.value);
  };

  //Search Function
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="mb-20">
      <h1 className="text-center font-bold my-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        ALL TUITIONS
      </h1>
      <div className="flex justify-evenly">
        <h1>Total Tuition ({totalData})</h1>

        {/* Search */}
        <div className="flex flex-col gap-1">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={handleSearch}
              type="search"
              required
              placeholder="Search by Class OR Location"
            />
          </label>
          <sub>NB(Only for Class): Write Only 7 not Class-7</sub>
        </div>

        {/* Sort */}
        <div>
          <span>Sort by: </span>
          <select onChange={handleSorting} className="border-2">
            <option selected disabled={true}>
              Budget/Date
            </option>
            <option value="-1">Budget: High - Low</option>
            <option value="1">Budget: Low - High</option>
            <option value="">Latest Tuition</option>
            <option value="">Old Tuition</option>
          </select>
        </div>
      </div>

      {/* Tuition Card */}
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
              <p>Location: {tuition.Location}</p>
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
            key={index}
            onClick={() => {
              setCurrentPage(index);
            }}
            className="join"
          >
            <input
              className={`join-item btn ${
                index === currentPage && "btn-primary"
              } btn-square`}
              value={index + 1}
              name="options"
              readOnly
            />
          </div>
        ))}

        {currentPage < totalPage - 1 && (
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
