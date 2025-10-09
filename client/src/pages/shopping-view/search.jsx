// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Input } from "@/components/ui/input";
// //import { useToast } from "@/components/ui/use-toast";
// import { toast } from "sonner";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { fetchProductDetails } from "@/store/shop/products-slice";
// import {
//   getSearchResults,
//   resetSearchResults,
// } from "@/store/shop/search-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// function SearchProducts() {
//   const [keyword, setKeyword] = useState("");
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const { searchResults } = useSelector((state) => state.shopSearch);
//   const { productDetails } = useSelector((state) => state.shopProducts);

//   const { user } = useSelector((state) => state.auth);

//   const { cartItems } = useSelector((state) => state.shopCart);
//   //const { toast } = useToast();
//   useEffect(() => {
//     if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
//       setTimeout(() => {
//         setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
//         dispatch(getSearchResults(keyword));
//       }, 1000);
//     } else {
//       setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
//       dispatch(resetSearchResults());
//     }
//   }, [keyword]);

//   function handleAddtoCart(getCurrentProductId, getTotalStock) {
//     console.log(cartItems);
//     let getCartItems = cartItems.items || [];

//     if (getCartItems.length) {
//       const indexOfCurrentItem = getCartItems.findIndex(
//         (item) => item.productId === getCurrentProductId
//       );
//       if (indexOfCurrentItem > -1) {
//         const getQuantity = getCartItems[indexOfCurrentItem].quantity;
//         if (getQuantity + 1 > getTotalStock) {
//         //   toast({
//         //     title: `Only ${getQuantity} quantity can be added for this item`,
//         //     variant: "destructive",
//         //   });
//         toast.error(`Only ${getQuantity} quantity can be added for this item`);

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

//   function handleGetProductDetails(getCurrentProductId) {
//     console.log(getCurrentProductId);
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   console.log(searchResults, "searchResults");

//   return (
//     <div className="container mx-auto md:px-6 px-4 py-8">
//       <div className="flex justify-center mb-8">
//         <div className="w-full flex items-center">
//           <Input
//             value={keyword}
//             name="keyword"
//             onChange={(event) => setKeyword(event.target.value)}
//             className="py-6"
//             placeholder="Search Products..."
//           />
//         </div>
//       </div>
//       {!searchResults.length ? (
//         <h1 className="text-5xl font-extrabold">No result found!</h1>
//       ) : null}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {searchResults.map((item) => (
//           <ShoppingProductTile
//             handleAddtoCart={handleAddtoCart}
//             product={item}
//             handleGetProductDetails={handleGetProductDetails}
//           />
//         ))}
//       </div>
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// }

// export default SearchProducts;


import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmedKeyword = keyword.trim();
      if (trimmedKeyword.length > 3) {
        setSearchParams(new URLSearchParams(`?keyword=${trimmedKeyword}`));
        dispatch(getSearchResults(trimmedKeyword));
      } else {
        setSearchParams(new URLSearchParams(`?keyword=${trimmedKeyword}`));
        dispatch(resetSearchResults());
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [keyword, dispatch, setSearchParams]);

  // Add product to cart with stock check
  function handleAddtoCart(productId, totalStock) {
    const cart = cartItems.items || [];
    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast.error(`Only ${existingItem.quantity} quantity can be added for this item`);
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product is added to cart");
      }
    });
  }

  // Fetch product details
  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  // Open details dialog when productDetails changes
  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
          className="py-4 md:py-6"
        />
      </div>

      {/* No Results */}
      {!searchResults.length && keyword.trim().length > 3 && (
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8">
          No result found!
        </h1>
      )}

      {/* Search Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchResults.map((product) => (
          <ShoppingProductTile
            key={product._id}
            product={product}
            handleAddtoCart={handleAddtoCart}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
