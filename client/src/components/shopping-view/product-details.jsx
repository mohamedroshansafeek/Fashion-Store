// import { StarIcon } from "lucide-react";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { Separator } from "../ui/separator";
// import { Input } from "../ui/input";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// //import { useToast } from "../ui/use-toast";
// import { toast } from "sonner"
// import { setProductDetails } from "@/store/shop/products-slice";
// import { Label } from "../ui/label";
// import StarRatingComponent from "../common/star-rating";
// import { useEffect, useState } from "react";
// import { addReview, getReviews } from "@/store/shop/review-slice";

// function ProductDetailsDialog({ open, setOpen, productDetails }) {
//   const [reviewMsg, setReviewMsg] = useState("");
//   const [rating, setRating] = useState(0);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { reviews } = useSelector((state) => state.shopReview);

//   //const { toast } = useToast();

//   function handleRatingChange(getRating) {
//     console.log(getRating, "getRating");

//     setRating(getRating);
//   }

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     let getCartItems = cartItems.items || [];

//     if (getCartItems.length) {
//       const indexOfCurrentItem = getCartItems.findIndex(
//         (item) => item.productId === getCurrentProductId
//       );
//       if (indexOfCurrentItem > -1) {
//         const getQuantity = getCartItems[indexOfCurrentItem].quantity;
//         if (getQuantity + 1 > getTotalStock) {
//           // toast({
//           //   title: `Only ${getQuantity} quantity can be added for this item`,
//           //   variant: "destructive",
//           // });
//           toast.error(`Only ${getQuantity} quantity can be added for this item`);

//           return;
//         }
//       }
//     }
//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         // toast({
//         //   title: "Product is added to cart",
//         // });
//         toast.success("Product is added to cart");
//       }
//     });
//   }

//   function handleDialogClose() {
//     setOpen(false);
//     dispatch(setProductDetails());
//     setRating(0);
//     setReviewMsg("");
//   }

//   function handleAddReview() {
//     dispatch(
//       addReview({
//         productId: productDetails?._id,
//         userId: user?.id,
//         userName: user?.userName,
//         reviewMessage: reviewMsg,
//         reviewValue: rating,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         setRating(0);
//         setReviewMsg("");
//         dispatch(getReviews(productDetails?._id));
//         // toast({
//         //   title: "Review added successfully!",
//         // });
//         toast.success("Review added successfully!");
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) dispatch(getReviews(productDetails?._id));
//   }, [productDetails]);

//   console.log(reviews, "reviews");

//   const averageReview =
//     reviews && reviews.length > 0
//       ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
//         reviews.length
//       : 0;

//   return (
//     <Dialog open={open} onOpenChange={handleDialogClose}>
//       <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
//         <div className="relative overflow-hidden rounded-lg">
//           <img
//             src={productDetails?.image}
//             alt={productDetails?.title}
//             width={600}
//             height={600}
//             className="aspect-square w-full object-cover"
//           />
//         </div>
//         <div className="">
//           <div>
//             <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
//             <p className="text-muted-foreground text-2xl mb-5 mt-4">
//               {productDetails?.description}
//             </p>
//           </div>
//           <div className="flex items-center justify-between">
//             <p
//               className={`text-3xl font-bold text-primary ${
//                 productDetails?.salePrice > 0 ? "line-through" : ""
//               }`}
//             >
//               ${productDetails?.price}
//             </p>
//             {productDetails?.salePrice > 0 ? (
//               <p className="text-2xl font-bold text-muted-foreground">
//                 ${productDetails?.salePrice}
//               </p>
//             ) : null}
//           </div>
//           <div className="flex items-center gap-2 mt-2">
//             <div className="flex items-center gap-0.5">
//               <StarRatingComponent rating={averageReview} />
//             </div>
//             <span className="text-muted-foreground">
//               ({averageReview.toFixed(2)})
//             </span>
//           </div>
//           <div className="mt-5 mb-5">
//             {productDetails?.totalStock === 0 ? (
//               <Button className="w-full opacity-60 cursor-not-allowed">
//                 Out of Stock
//               </Button>
//             ) : (
//               <Button
//                 className="w-full"
//                 onClick={() =>
//                   handleAddToCart(
//                     productDetails?._id,
//                     productDetails?.totalStock
//                   )
//                 }
//               >
//                 Add to Cart
//               </Button>
//             )}
//           </div>
//           <Separator />
//           <div className="max-h-[300px] overflow-auto">
//             <h2 className="text-xl font-bold mb-4">Reviews</h2>
//             <div className="grid gap-6">
//               {reviews && reviews.length > 0 ? (
//                 reviews.map((reviewItem) => (
//                   <div className="flex gap-4">
//                     <Avatar className="w-10 h-10 border">
//                       <AvatarFallback>
//                         {reviewItem?.userName[0].toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="grid gap-1">
//                       <div className="flex items-center gap-2">
//                         <h3 className="font-bold">{reviewItem?.userName}</h3>
//                       </div>
//                       <div className="flex items-center gap-0.5">
//                         <StarRatingComponent rating={reviewItem?.reviewValue} />
//                       </div>
//                       <p className="text-muted-foreground">
//                         {reviewItem.reviewMessage}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <h1>No Reviews</h1>
//               )}
//             </div>
//             <div className="mt-10 flex-col flex gap-2">
//               <Label>Write a review</Label>
//               <div className="flex gap-1">
//                 <StarRatingComponent
//                   rating={rating}
//                   handleRatingChange={handleRatingChange}
//                 />
//               </div>
//               <Input
//                 name="reviewMsg"
//                 value={reviewMsg}
//                 onChange={(event) => setReviewMsg(event.target.value)}
//                 placeholder="Write a review..."
//               />
//               <Button
//                 onClick={handleAddReview}
//                 disabled={reviewMsg.trim() === ""}
//               >
//                 Submit
//               </Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ProductDetailsDialog;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";

import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";
import StarRatingComponent from "../common/star-rating";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const handleRatingChange = (value) => setRating(value);

  const handleAddToCart = (productId, totalStock) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    const existingItems = cartItems.items || [];
    const existingItem = existingItems.find((item) => item.productId === productId);

    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast.error(`Only ${existingItem.quantity} quantity can be added for this item.`);
      return;
    }

    dispatch(addToCart({ userId: user.id, productId, quantity: 1 }))
      .then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchCartItems(user.id));
          toast.success("Product added to cart!");
        }
      });
  };

  const handleAddReview = () => {
    if (!user) {
      toast.error("Please log in to write a review.");
      return;
    }

    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user.id,
        userName: user.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails._id));
        toast.success("Review added successfully!");
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  useEffect(() => {
    if (productDetails) dispatch(getReviews(productDetails._id));
  }, [productDetails, dispatch]);

  const averageReview =
    reviews?.length > 0
      ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] overflow-y-auto">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
          <p className="text-muted-foreground text-lg mt-3 mb-4">
            {productDetails?.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <p
              className={`text-2xl font-bold ${
                productDetails?.salePrice > 0 ? "line-through text-gray-400" : "text-primary"
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-green-600">
                ${productDetails.salePrice}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-5">
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          {/* Add to Cart */}
          {productDetails?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed">
              Out of Stock
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() =>
                handleAddToCart(productDetails._id, productDetails.totalStock)
              }
            >
              Add to Cart
            </Button>
          )}

          <Separator className="my-6" />

          {/* Reviews Section */}
          <div className="max-h-[300px] overflow-auto space-y-5 pr-2">
            <h2 className="text-xl font-bold">Reviews</h2>
            {reviews?.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="flex gap-4 border-b pb-3">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      {review.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{review.userName}</h3>
                    <StarRatingComponent rating={review.reviewValue} />
                    <p className="text-muted-foreground mt-1">{review.reviewMessage}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No reviews yet.</p>
            )}

            {/* Add Review */}
            <div className="mt-6 space-y-2">
              <Label>Write a review</Label>
              <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
              />
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review..."
              />
              <Button onClick={handleAddReview} disabled={!reviewMsg.trim()}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
