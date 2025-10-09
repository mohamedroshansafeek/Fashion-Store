// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";

// function PaymentSuccessPage() {
//   const navigate = useNavigate();

//   return (
//     <Card className="p-10">
//       <CardHeader className="p-0">
//         <CardTitle className="text-4xl">Payment is successfull!</CardTitle>
//       </CardHeader>
//       <Button className="mt-5" onClick={() => navigate("/shop/account")}>
//         View Orders
//       </Button>
//     </Card>
//   );
// }

// export default PaymentSuccessPage;

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="p-8 sm:p-10 w-full max-w-md text-center">
        <CardHeader className="p-0">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <p className="mt-4 text-gray-700">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Button
          className="mt-6 w-full"
          onClick={() => navigate("/shop/account")}
        >
          View Orders
        </Button>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
