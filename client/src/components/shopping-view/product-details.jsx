import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { toast } from "sonner";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(productId, totalStock) {
    const currentCart = cartItems.items || [];
    const index = currentCart.findIndex((item) => item.productId === productId);

    if (index > -1 && currentCart[index].quantity + 1 > totalStock) {
      toast.error(`Only ${currentCart[index].quantity} quantity can be added for this item`);
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product is added to cart");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast.success("Review added successfully!");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:p-6 max-w-[95vw] sm:max-w-[85vw] lg:max-w-[70vw]">
        {/* Left: Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          {/* Header with Title and Close Button */}
          <DialogHeader className="flex justify-between items-start mb-4 relative">
            <DialogTitle className="text-2xl sm:text-3xl font-extrabold">
              {productDetails?.title}
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="absolute top-2 right-2 sm:static text-xl font-bold"
              >
                ✕
              </Button>
            </DialogClose>
          </DialogHeader>

          <p className="text-muted-foreground mb-4">{productDetails?.description}</p>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <p className={`text-2xl font-bold text-primary ${productDetails?.salePrice ? "line-through" : ""}`}>
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice ? (
              <p className="text-2xl font-bold text-muted-foreground">${productDetails?.salePrice}</p>
            ) : null}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground">({averageReview.toFixed(2)})</span>
          </div>

          {/* Add to Cart Button */}
          <div className="mb-4">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">Out of Stock</Button>
            ) : (
              <Button className="w-full" onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}>
                Add to Cart
              </Button>
            )}
          </div>

          <Separator />

          {/* Reviews */}
          <div className="max-h-[300px] overflow-auto mt-4">
            <h2 className="text-xl font-bold mb-3">Reviews</h2>
            <div className="grid gap-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem._id} className="flex gap-3">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <h3 className="font-bold">{reviewItem?.userName}</h3>
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                      <p className="text-muted-foreground">{reviewItem.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Reviews</p>
              )}
            </div>

            {/* Add Review */}
            <div className="mt-4 flex flex-col gap-2">
              <Label>Write a review</Label>
              <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review..."
              />
              <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>
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
