import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../providers/AuthContext";
import Loader from "../../../utilities/Loader";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const result = await axiosSecure(`/studentPayment/${user.email}`);
      setData(result.data.result);
      console.log("data", result.data.result);
      setLoading(false);
    };
    loadData();
  }, [axiosSecure, user]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <h1 className="text-center font-bold my-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        Payment History
      </h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Serial Number</th>
              <th>Transaction-ID</th>
              <th>To</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Date</th>
            </tr>
          </thead>
          {data.map((info, index) => (
            <tbody key={info._id}>
              <tr className="text-center">
                <th>{index + 1}</th>
                <td>{info.transactionID}</td>
                <td>{info.tutorEmail}</td>
                <td>{info.Amount}</td>
                <td>{info.paymentStatus}</td>
                <td>{info.paidTime}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
