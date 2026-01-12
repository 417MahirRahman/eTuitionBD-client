import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthContext from "../../../providers/AuthContext";
import Loader from "../../../utilities/Loader";

const RevenueHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const result = await axiosSecure(`/tutorRevenue/${user.email}`);
      setData(result.data.result || []);
      setLoading(false);
    };
    loadData();
  }, [axiosSecure, user]);

  useEffect(() => {
    const total = data.reduce((sum, item) => sum + item.Amount, 0);
    setTotalAmount(total);
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-96">
            <p className="text-3xl md:text-4xl text-slate-600">
              No Revenue History Found
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-center font-bold mb-4 text-3xl md:text-4xl text-slate-800">
              Revenue History
            </h1>

            <h3 className="text-center font-bold mb-8 text-xl md:text-2xl text-green-600">
              Total Revenue: {totalAmount}
            </h3>

            <div className="bg-white rounded-box shadow-lg overflow-hidden border border-slate-200">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-slate-50">
                    <tr className="text-center border-b border-slate-200">
                      <th className="py-4 px-4 text-slate-700 font-semibold">
                        Serial
                      </th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">
                        Transaction ID
                      </th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">
                        From
                      </th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">
                        Amount
                      </th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">
                        Status
                      </th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((info, index) => (
                      <tr
                        key={info._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="text-center hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-slate-600 font-medium">
                          {index + 1}
                        </td>
                        <td className="py-4 px-4 text-slate-600 font-mono text-sm">
                          {info.transactionID}
                        </td>
                        <td className="py-4 px-4 text-slate-600">
                          {info.studentEmail}
                        </td>
                        <td className="py-4 px-4 text-green-600 font-semibold">
                          {info.Amount}
                        </td>
                        <td className="py-4 px-4 text-green-600 font-semibold">
                          {info.paymentStatus}
                        </td>
                        <td className="py-4 px-4 text-slate-600">
                          {info.paidTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueHistory;
