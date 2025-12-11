import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionID = searchParams.get("session_id");
  //console.log(sessionID)

  useEffect(() => {
    if (sessionID) {
      axiosSecure.put(`/paymentSuccess?session_id=${sessionID}`).then((res) => {
        console.log(res.data);
      });
    }
  }, [sessionID, axiosSecure]);

  return (
    <div>
      <h1>Payment Successfull</h1>
    </div>
  );
};

export default PaymentSuccess;
