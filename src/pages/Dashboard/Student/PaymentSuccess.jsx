import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionID = searchParams.get("session_id");

  useEffect(() => {
    if (sessionID) {
      axiosSecure.put(`/paymentSuccess?session_id=${sessionID}`).then((res) => {
        console.log(res.data);
      });
    }
  }, [sessionID, axiosSecure]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center border border-green-200">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Payment Successful!
        </h1>

        <p className="text-slate-600 mb-8 text-lg">
          Your payment has been processed successfully.
        </p>

        <div className="space-y-4">
          <Link
            to="/dashboard/myTuitions"
            className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to={"/"}
            className="block text-slate-700 hover:text-slate-900 font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
