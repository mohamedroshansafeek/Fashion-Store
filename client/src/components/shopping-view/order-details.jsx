// import { useSelector } from "react-redux";
// import { Badge } from "../ui/badge";
// import { DialogContent } from "../ui/dialog";
// import { Label } from "../ui/label";
// import { Separator } from "../ui/separator";

// function ShoppingOrderDetailsView({ orderDetails }) {
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <DialogContent className="sm:max-w-[600px]">
//       <div className="grid gap-6">
//         <div className="grid gap-2">
//           <div className="flex mt-6 items-center justify-between">
//             <p className="font-medium">Order ID</p>
//             <Label>{orderDetails?._id}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Date</p>
//             <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Price</p>
//             <Label>${orderDetails?.totalAmount}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Payment method</p>
//             <Label>{orderDetails?.paymentMethod}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Payment Status</p>
//             <Label>{orderDetails?.paymentStatus}</Label>
//           </div>
//           <div className="flex mt-2 items-center justify-between">
//             <p className="font-medium">Order Status</p>
//             <Label>
//               <Badge
//                 className={`py-1 px-3 ${
//                   orderDetails?.orderStatus === "confirmed"
//                     ? "bg-green-500"
//                     : orderDetails?.orderStatus === "rejected"
//                     ? "bg-red-600"
//                     : "bg-black"
//                 }`}
//               >
//                 {orderDetails?.orderStatus}
//               </Badge>
//             </Label>
//           </div>
//         </div>
//         <Separator />
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <div className="font-medium">Order Details</div>
//             <ul className="grid gap-3">
//               {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
//                 ? orderDetails?.cartItems.map((item) => (
//                     <li className="flex items-center justify-between">
//                       <span>Title: {item.title}</span>
//                       <span>Quantity: {item.quantity}</span>
//                       <span>Price: ${item.price}</span>
//                     </li>
//                   ))
//                 : null}
//             </ul>
//           </div>
//         </div>
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <div className="font-medium">Shipping Info</div>
//             <div className="grid gap-0.5 text-muted-foreground">
//               <span>{user.userName}</span>
//               <span>{orderDetails?.addressInfo?.address}</span>
//               <span>{orderDetails?.addressInfo?.city}</span>
//               <span>{orderDetails?.addressInfo?.pincode}</span>
//               <span>{orderDetails?.addressInfo?.phone}</span>
//               <span>{orderDetails?.addressInfo?.notes}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DialogContent>
//   );
// }

// export default ShoppingOrderDetailsView;

import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  if (!orderDetails) {
    return (
      <DialogContent className="sm:max-w-[600px]">
        <div className="text-center py-10 text-muted-foreground">
          No order details available.
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        {/* Order Summary */}
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium text-sm">Order ID</p>
            <Label className="text-sm break-all">{orderDetails?._id}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-sm">Order Date</p>
            <Label className="text-sm">
              {orderDetails?.orderDate
                ? orderDetails?.orderDate.split("T")[0]
                : "N/A"}
            </Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-sm">Total Amount</p>
            <Label className="text-sm">
              ${Number(orderDetails?.totalAmount || 0).toFixed(2)}
            </Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-sm">Payment Method</p>
            <Label className="text-sm">{orderDetails?.paymentMethod || "N/A"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-sm">Payment Status</p>
            <Label className="text-sm">{orderDetails?.paymentStatus || "N/A"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-sm">Order Status</p>
            <Badge
              className={`py-1 px-3 text-xs font-semibold ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500 text-white"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-black text-white"
              }`}
            >
              {orderDetails?.orderStatus || "Pending"}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Ordered Items */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-base">Order Details</div>
            <ul className="grid gap-3 text-sm">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
                orderDetails.cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-muted/20 p-2 rounded-md"
                  >
                    <span className="font-medium">{item.title}</span>
                    <div className="flex gap-4 text-muted-foreground text-sm">
                      <span>Qty: {item.quantity}</span>
                      <span>Price: ${Number(item.price).toFixed(2)}</span>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No items found.</p>
              )}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Shipping Info */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-base">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground text-sm">
              <span>{user?.userName || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.address || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.city || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.pincode || "N/A"}</span>
              <span>{orderDetails?.addressInfo?.phone || "N/A"}</span>
              {orderDetails?.addressInfo?.notes && (
                <span>Note: {orderDetails.addressInfo.notes}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
