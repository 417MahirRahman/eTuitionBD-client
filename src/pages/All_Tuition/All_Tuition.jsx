import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../../providers/AuthContext";
import Loader from "../../utilities/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "motion/react";

const All_Tuition = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("budget_desc");
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    grade: "",
    subject: "",
    location: "",
  });
  const limit = 6;

  useEffect(() => {
    const loadData = async () => {
      const result = await axiosSecure(
        `/allTuitions?limit=${limit}&skip=${
          currentPage * limit
        }&sort=${sort}&search=${searchValue}&grade=${filters.grade}&subject=${
          filters.subject
        }&location=${filters.location}`
      );
      setData(result.data.result);
      setTotalData(result.data.total);
      const page = Math.ceil(result.data.total / limit);
      setTotalPage(page);
    };
    loadData();
  }, [user, axiosSecure, currentPage, sort, searchValue, filters]);

  if (loading) {
    return <Loader />;
  }

  //Sort By Function
  const handleSorting = (e) => {
    setSort(e.target.value);
  };

  //Search Function
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  //Filter Function
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center font-bold my-8 lg:my-12 text-3xl md:text-4xl lg:text-5xl text-slate-800">
          ALL TUITIONS
        </h1>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="text-slate-700 font-semibold text-lg gap-1 flex xl:justify-center xl:items-center">
              Total Tuitions: <span className="text-blue-600">({totalData})</span>
            </div>

            {/* Search */}
            <div className="flex flex-col lg:flex-row xl:items-center gap-3">
              <h1 className="text-slate-700 font-semibold text-lg">Search:</h1>
              <div className="flex flex-col gap-2 w-full lg:w-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-slate-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                  <input
                    onChange={handleSearch}
                    type="search"
                    className="w-full lg:w-80 pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl"
                    placeholder="Search by Class or Location"
                  />
                </div>
              </div>
            </div>

            {/* Filter and Sort Section */}
            <div className="gird grid-cols-1 space-y-2 sm:flex-row gap-4 w-full lg:w-auto">
              {/* Filter */}
              <div className="flex flex-col lg:flex-row xl:justify-center xl:items-center gap-3">
                <h1 className="text-slate-700 font-semibold text-lg">
                  Filter:
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                  <select
                    name="grade"
                    onChange={handleFilterChange}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="">Class</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>

                  <select
                    name="subject"
                    onChange={handleFilterChange}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="">Subject</option>
                    <option value="Math">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Bangla">Bangla</option>
                    <option value="Science">Science</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Physics">Physics</option>
                  </select>

                  <select
                    name="location"
                    onChange={handleFilterChange}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="">Location</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Badda">Badda</option>
                    <option value="Moghbazar">Moghbazar</option>
                    <option value="Khilgaon">Khilgaon</option>
                    <option value="Banasree">Banasree</option>
                    <option value="Rampura">Rampura</option>
                    <option value="Gulshan">Gulshan</option>
                    <option value="Banani">Banani</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Uttara">Uttara</option>
                  </select>
                </div>
              </div>

              {/* Sort */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <h1 className="text-slate-700 font-semibold text-lg">Sort:</h1>
                <div className="gap-2">
                  <select
                    onChange={handleSorting}
                    className="px-4 py-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="">Sort By</option>
                    <option value="budget_desc">Budget: High - Low</option>
                    <option value="budget_asc">Budget: Low - High</option>
                    <option value="date_desc">Latest Tuition</option>
                    <option value="date_asc">Old Tuition</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tuition Card */}
        {data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-xl">No Tuitions Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.map((tuition) => (
              <motion.div
                key={tuition._id}
                whileHover={{ y: -10, x: 5, scale: 1.05, zIndex: 10 }}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                      Class: {tuition.Class}
                    </h3>
                    <div className="w-12 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                  </div>
                  <div className="space-y-3 text-slate-600">
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">
                        Subjects:
                      </span>
                      {tuition.Subjects}
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">
                        Budget:
                      </span>
                      <span className="text-green-600 font-medium">
                        {tuition.Budget}
                      </span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-semibold text-slate-700 mr-2">
                        Location:
                      </span>
                      {tuition.Location}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/all-tuition/${tuition._id}`}
                      className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg block text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Page Number */}
        {totalPage > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                Previous
              </button>
            )}

            {[...Array(totalPage).keys()].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-10 h-10 rounded-lg font-medium ${
                  index === currentPage
                    ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {currentPage < totalPage - 1 && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default All_Tuition;
