import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  // 🧮 Calculate Total Amount
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto max-h-[90vh] flex flex-col">
      {/* Header */}
      <SheetHeader>
        <SheetTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-center sm:text-left">
          Your Cart 🛒
        </SheetTitle>
      </SheetHeader>

      {/* Cart Items */}
      <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1 sm:pr-2">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.productId} cartItem={item} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
            <p className="text-sm sm:text-base font-medium">
              Your cart is empty 🛍️
            </p>
          </div>
        )}
      </div>

      {/* Total + Checkout */}
      {cartItems && cartItems.length > 0 && (
        <div className="mt-6 border-t pt-4 space-y-3 bg-white dark:bg-gray-900 sticky bottom-0">
          <div className="flex justify-between text-base sm:text-lg font-semibold">
            <span>Total</span>
            <span>${totalCartAmount.toFixed(2)}</span>
          </div>
          <Button
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
            className="w-full py-3 text-base sm:text-lg rounded-xl"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;
