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
          toast.error("Payment capture failed!");
          setIsProcessing(false);
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong during payment!");
        setIsProcessing(false);
      }
    }

    handleCapture();
  }, [token, dispatch, navigate]);

  return (
    <Card className="p-10 text-center">
      <CardHeader>
        <CardTitle className="mb-4 text-xl font-bold">
          {isProcessing ? "Processing Payment...Please wait!" : "Payment Failed"}
        </CardTitle>
      </CardHeader>
      {isProcessing && (
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
      )}
    </Card>
  );
}

export default PaypalReturnPage;

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

//   const token = params.get("token"); // PayPal token
//   const payerId = params.get("PayerID"); // Optional, if you want to save

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

//           // Redirect to order review page
//           navigate(`/shop/order-review/${orderId}`);
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

// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { capturePayment } from "@/store/shop/order-slice";
// import { checkAuth } from "@/store/auth-slice"; // ✅ import added
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
//   const payerId = params.get("PayerID");
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

//           // ✅ Recheck if cookie is valid (important after PayPal redirect)
//           const authCheck = await dispatch(checkAuth());
//           if (authCheck?.payload?.success) {
//             navigate(`/shop/order-review/${orderId}`);
//           } else {
//             toast.error("Session expired! Please login again.");
//             navigate("/auth/login");
//           }
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
//           {isProcessing ? "Processing Payment... Please wait!" : "Payment Failed"}
//         </CardTitle>
//       </CardHeader>
//       {isProcessing && (
//         <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
//       )}
//     </Card>
//   );
// }

// export default PaypalReturnPage;
