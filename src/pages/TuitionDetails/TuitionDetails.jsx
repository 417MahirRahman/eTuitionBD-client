import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AuthContext from "../../providers/AuthContext";
import { useForm } from "react-hook-form";
import Loader from "../../utilities/Loader";

const TuitionDetails = () => {
  const { id } = useParams();
  const { loading, setLoading } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadTuitionDetails = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/allTuitions/${id}`);
      //   if (!res.ok) {
      //     navigate("/detailsNotFound");
      //     return;
      //   }
      const result = await res.json();
      setData(result.result);
      console.log("Result:", result.result);
      setLoading(false);
    };
    loadTuitionDetails();
  }, [id, setLoading, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="pb-20 p-2">
      <h1 className="text-center font-bold mt-10 mb-8 text-4xl">
        TUITION DETAILS
      </h1>

      {/* Food Info */}
      <div
        data-aos="flip-left"
        className="hero flex justify-end bg-linear-to-r from-white to-[#DC143C] mt-10 w-full md:w-3/4 mx-auto rounded-xl shadow-2xl"
      >
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <div>
            <h1 className="text-3xl font-bold">Class: {data.Class}</h1>
            <p className="font-semibold mt-2">Subjects: {data.Subjects}</p>
            <p className="font-semibold">Budget: {data.Budget}</p>
            <p className="font-semibold">Location: {data.Location}</p>
            {
              <button
                className="btn bg-[#DC143C] text-white font-bold rounded-xl border-none"
                onClick={() =>
                  document.getElementById(`modal_${data._id}`).showModal()
                }
              >
                Apply
              </button>
            }
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id={`modal_${data?._id}`} className="modal">
        <form
          onSubmit={handleSubmit(() => {})}
          className="modal-box bg-white text-black"
        >
          <h3 className="font-bold text-lg mb-4 text-center">Request Food</h3>

          <label className="label">Location</label>
          <input
            {...register("Location", { required: "Location is required" })}
            type="text"
            className="input input-bordered w-full"
            placeholder="#Road-9"
          />
          {errors.Location && (
            <p className="text-red-500">{errors.Location.message}</p>
          )}

          <label className="label mt-3">Why Need Food?</label>
          <textarea
            {...register("WhyNeedFood")}
            className="textarea textarea-bordered w-full"
          ></textarea>

          <label className="label mt-3">Contact Number</label>
          <input
            {...register("ContactNumber", {
              required: "Contact Number is required",
            })}
            type="text"
            className="input input-bordered w-full"
            placeholder="01****"
          />
          {errors.ContactNumber && (
            <p className="text-red-500">{errors.ContactNumber.message}</p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button className="btn bg-[#DC143C] text-white">Submit</button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                document.getElementById(`modal_${data._id}`).close()
              }
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default TuitionDetails;
