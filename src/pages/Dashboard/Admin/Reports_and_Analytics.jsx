import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../utilities/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Reports_and_Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch data safely
  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const result = await axiosSecure("/allPaymentInfo");
        // always ensure result.data is an array
        setData(Array.isArray(result.data) ? result.data : result.data?.result || []);
        console.log("Data:", result.data);
      } catch (err) {
        console.error("Error fetching payment info:", err);
        setData([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [axiosSecure]);

  // Calculate total revenue safely
  useEffect(() => {
    const total = (data || []).reduce((sum, item) => sum + Number(item.Amount || 0), 0);
    setTotalAmount(total);
  }, [data]);

  if (loading) return <Loader />;

  // Prepare chart data safely
  const chartData = Array.from({ length: 12 }, (_, i) => ({
    name: `Class:${i + 1}`,
    revenue: 0,
  }));

  (data || []).forEach((item) => {
    const index = Number(item.studentClass) - 1;
    if (index >= 0 && index < chartData.length) {
      chartData[index].revenue += Number(item.Amount || 0);
    }
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {(!data || data.length === 0) ? (
          <div className="flex flex-col items-center justify-center min-h-96">
            <p className="text-3xl md:text-4xl text-slate-600">
              No Payment Data Found
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-center font-bold mb-4 text-3xl md:text-4xl text-slate-800">
              All Payment History
            </h1>

            <h3 className="text-center font-bold mb-8 text-xl md:text-2xl text-green-600">
              Total Revenue: {totalAmount}
            </h3>

            <div className="bg-white rounded-box shadow-lg overflow-hidden border border-slate-200">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-slate-50">
                    <tr className="text-center border-b border-slate-200">
                      <th className="py-4 px-4 text-slate-700 font-semibold">Serial</th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">Transaction ID</th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">Class</th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">From</th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">To</th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">Amount</th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">Status</th>
                      <th className="py-4 px-4 text-slate-700 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data || []).map((info, index) => (
                      <tr key={info._id || index} className="text-center hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4 text-slate-600 font-medium">{index + 1}</td>
                        <td className="py-4 px-4 text-slate-600 font-mono text-sm">{info.transactionID || "-"}</td>
                        <td className="py-4 px-4 text-slate-600 font-mono text-sm">{info.studentClass || "-"}</td>
                        <td className="py-4 px-4 text-slate-600">{info.studentEmail || "-"}</td>
                        <td className="py-4 px-4 text-slate-600">{info.tutorEmail || "-"}</td>
                        <td className="py-4 px-4 text-green-600 font-semibold">{info.Amount || 0}</td>
                        <td className="py-4 px-4 text-green-600 font-semibold">{info.paymentStatus || "-"}</td>
                        <td className="py-4 px-4 text-slate-600">{info.paidTime ? new Date(info.paidTime).toLocaleString() : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="w-full max-w-4xl mx-auto py-8 mt-15">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Monthly Revenue by Class
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#4f46e5" radius={[8, 8, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports_and_Analytics;
