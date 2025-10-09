// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { capturePayment } from "@/store/shop/order-slice";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// function PaypalReturnPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const token = params.get("token"); 

//   const [isProcessing, setIsProcessing] = useState(true);

//   useEffect(() => {
//     async function handleCapture() {
//       try {
//         const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
//         if (!token || !orderId) {
//           throw new Error("Payment info missing!");
//         }

//         const result = await dispatch(
//           capturePayment({ orderToken: token, orderId })
//         );

//         console.log("Capture Result:", result);

//         if (result?.payload?.success) {
//           sessionStorage.removeItem("currentOrderId");
//           toast.success("Payment Successful!");
//           navigate("/shop/payment-success");
//         } else {
//           toast.error("Payment capture failed!");
//           setIsProcessing(false);
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Something went wrong during payment!");
//         setIsProcessing(false);
//       }
//     }

//     handleCapture();
//   }, [token, dispatch, navigate]);

//   return (
//     <Card className="p-10 text-center">
//       <CardHeader>
//         <CardTitle className="mb-4 text-xl font-bold">
//           {isProcessing ? "Processing Payment...Please wait!" : "Payment Failed"}
//         </CardTitle>
//       </CardHeader>
//       {isProcessing && (
//         <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
//       )}
//     </Card>
//   );
// }

// export default PaypalReturnPage;

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token"); 

  const [isProcessing, setIsProcessing] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function handleCapture() {
      try {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
        if (!token || !orderId) {
          throw new Error("Payment info missing!");
        }

        const result = await dispatch(
          capturePayment({ orderToken: token, orderId })
        );

        console.log("Capture Result:", result);

        if (result?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          toast.success("Payment Successful!");
          navigate("/shop/payment-success");
        } else {
          throw new Error("Payment capture failed!");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Something went wrong during payment!");
        setIsProcessing(false);
        setHasError(true);
      }
    }

    handleCapture();
  }, [token, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="p-8 sm:p-10 w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="mb-4 text-xl sm:text-2xl font-bold">
            {isProcessing
              ? "Processing Payment... Please wait!"
              : hasError
              ? "Payment Failed"
              : "Payment Status"}
          </CardTitle>
        </CardHeader>

        {isProcessing ? (
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        ) : hasError ? (
          <p className="text-red-600 mt-4">
            Your payment could not be processed. Please try again or contact support.
          </p>
        ) : null}
      </Card>
    </div>
  );
}

export default PaypalReturnPage;
