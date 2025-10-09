// import Address from "@/components/shopping-view/address";
// import img from "../../assets/account.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import { createNewOrder } from "@/store/shop/order-slice";
// import { toast } from "sonner";

// function ShoppingCheckout() {
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const [isPaymentStart, setIsPaymentStart] = useState(false);

//   // Total cart amount calculation
//   const totalCartAmount =
//     cartItems && cartItems.items && cartItems.items.length > 0
//       ? cartItems.items.reduce(
//           (sum, item) =>
//             sum +
//             (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
//           0
//         )
//       : 0;

//   // Persist user in localStorage (survive redirect)
//   useEffect(() => {
//     if (user) localStorage.setItem("user", JSON.stringify(user));
//   }, [user]);

//   // Handle PayPal payment
//   const handleInitiatePaypalPayment = () => {
//     if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
//       toast.error("Your cart is empty. Please add items.");
//       return;
//     }

//     if (!currentSelectedAddress) {
//       toast.error("Please select an address to proceed.");
//       return;
//     }

//     const orderData = {
//       userId: user.id,
//       cartId: cartItems._id,
//       cartItems: cartItems.items.map((item) => ({
//         productId: item.productId,
//         title: item.title,
//         image: item.image,
//         price: item.salePrice > 0 ? item.salePrice : item.price,
//         quantity: item.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress._id,
//         address: currentSelectedAddress.address,
//         city: currentSelectedAddress.city,
//         pincode: currentSelectedAddress.pincode,
//         phone: currentSelectedAddress.phone,
//         notes: currentSelectedAddress.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "paypal",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: "",
//     };

//     setIsPaymentStart(true);
//     toast.success("Order created! Redirecting to PayPal...");

//     dispatch(createNewOrder(orderData)).then((data) => {
//       if (data?.payload?.success) {
//         const orderId = data.payload.orderId;
//         sessionStorage.setItem("currentOrderId", JSON.stringify(orderId));

//         // Redirect to PayPal approval
//         const approvalURL = data.payload.approvalURL;
//         if (approvalURL) {
//           window.location.href = approvalURL;
//         } else {
//           setIsPaymentStart(false);
//           toast.error("Approval URL not found. Try again.");
//         }
//       } else {
//         setIsPaymentStart(false);
//         toast.error("Something went wrong. Please try again.");
//       }
//     });
//   };

//   return (
//     <div className="flex flex-col">
//       {/* Banner */}
//       <div className="relative h-[300px] w-full overflow-hidden">
//         <img
//           src={img}
//           className="h-full w-full object-cover object-center"
//           alt="Banner"
//         />
//       </div>

//       {/* Checkout Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
//         {/* Address Selection */}
//         <Address
//           selectedId={currentSelectedAddress}
//           setCurrentSelectedAddress={setCurrentSelectedAddress}
//         />

//         {/* Cart Items */}
//         <div className="flex flex-col gap-4">
//           {cartItems && cartItems.items && cartItems.items.length > 0
//             ? cartItems.items.map((item) => (
//                 <UserCartItemsContent key={item._id} cartItem={item} />
//               ))
//             : null}

//           {/* Total Amount */}
//           <div className="mt-8 space-y-4">
//             <div className="flex justify-between font-bold">
//               <span>Total</span>
//               <span>${totalCartAmount.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* PayPal Button */}
//           <div className="mt-4 w-full">
//             <Button
//               onClick={handleInitiatePaypalPayment}
//               className="w-full"
//               disabled={isPaymentStart}
//             >
//               {isPaymentStart
//                 ? "Processing Payment...Please wait!"
//                 : "Checkout with PayPal"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCheckout;

import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";

function ShoppingCheckout() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
          0
        )
      : 0;

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleInitiatePaypalPayment = () => {
    if (!cartItems?.items?.length) {
      toast.error("Your cart is empty. Please add items.");
      return;
    }

    if (!currentSelectedAddress) {
      toast.error("Please select an address to proceed.");
      return;
    }

    const orderData = {
      userId: user.id,
      cartId: cartItems._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    setIsPaymentStart(true);
    toast.success("Order created! Redirecting to PayPal...");

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        const orderId = data.payload.orderId;
        sessionStorage.setItem("currentOrderId", JSON.stringify(orderId));

        const approvalURL = data.payload.approvalURL;
        if (approvalURL) {
          window.location.href = approvalURL;
        } else {
          setIsPaymentStart(false);
          toast.error("Approval URL not found. Try again.");
        }
      } else {
        setIsPaymentStart(false);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Banner */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="Checkout Banner"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Checkout Grid */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Address Selection */}
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        {/* Cart Items */}
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 ? (
            cartItems.items.map((item) => (
              <UserCartItemsContent key={item._id} cartItem={item} />
            ))
          ) : (
            <p className="text-muted-foreground">Your cart is empty.</p>
          )}

          {/* Total Amount */}
          <div className="mt-6 flex justify-between font-bold text-lg border-t pt-4">
            <span>Total</span>
            <span>${totalCartAmount.toFixed(2)}</span>
          </div>

          {/* PayPal Button */}
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePaypalPayment}
              className="w-full"
              disabled={isPaymentStart}
            >
              {isPaymentStart
                ? "Processing Payment... Please wait!"
                : "Checkout with PayPal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
