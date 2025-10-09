// import ProductFilter from "@/components/shopping-view/filter";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// //import { useToast } from "@/components/ui/use-toast";
// import { toast } from "sonner";
// import { sortOptions } from "@/config";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import { ArrowUpDownIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// function createSearchParamsHelper(filterParams) {
//   const queryParams = [];

//   for (const [key, value] of Object.entries(filterParams)) {
//     if (Array.isArray(value) && value.length > 0) {
//       const paramValue = value.join(",");

//       queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
//     }
//   }

//   console.log(queryParams, "queryParams");

//   return queryParams.join("&");
// }

// function ShoppingListing() {
//   const dispatch = useDispatch();
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   );
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const [filters, setFilters] = useState({});
//   const [sort, setSort] = useState(null);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//  // const { toast } = useToast();

//   const categorySearchParam = searchParams.get("category");

//   function handleSort(value) {
//     setSort(value);
//   }

//   function handleFilter(getSectionId, getCurrentOption) {
//     let cpyFilters = { ...filters };
//     const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

//     if (indexOfCurrentSection === -1) {
//       cpyFilters = {
//         ...cpyFilters,
//         [getSectionId]: [getCurrentOption],
//       };
//     } else {
//       const indexOfCurrentOption =
//         cpyFilters[getSectionId].indexOf(getCurrentOption);

//       if (indexOfCurrentOption === -1)
//         cpyFilters[getSectionId].push(getCurrentOption);
//       else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
//     }

//     setFilters(cpyFilters);
//     sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     console.log(getCurrentProductId);
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

// //   function handleAddtoCart(getCurrentProductId, getTotalStock) {
// //     console.log(cartItems);
// //     let getCartItems = cartItems.items || [];

// //     if (getCartItems.length) {
// //       const indexOfCurrentItem = getCartItems.findIndex(
// //         (item) => item.productId === getCurrentProductId
// //       );
// //       if (indexOfCurrentItem > -1) {
// //         const getQuantity = getCartItems[indexOfCurrentItem].quantity;
// //         if (getQuantity + 1 > getTotalStock) {
// //           toast({
// //             title: `Only ${getQuantity} quantity can be added for this item`,
// //             variant: "destructive",
// //           });

// //           return;
// //         }
// //       }
// //     }

// //     dispatch(
// //       addToCart({
// //         userId: user?.id,
// //         productId: getCurrentProductId,
// //         quantity: 1,
// //       })
// //     ).then((data) => {
// //       if (data?.payload?.success) {
// //         dispatch(fetchCartItems(user?.id));
// //         toast({
// //           title: "Product is added to cart",
// //         });
// //       }
// //     });
// //   }

// function handleAddtoCart(getCurrentProductId, getTotalStock) {
//   console.log(cartItems);
//   let getCartItems = cartItems.items || [];

//   if (getCartItems.length) {
//     const indexOfCurrentItem = getCartItems.findIndex(
//       (item) => item.productId === getCurrentProductId
//     );
//     if (indexOfCurrentItem > -1) {
//       const getQuantity = getCartItems[indexOfCurrentItem].quantity;
//       if (getQuantity + 1 > getTotalStock) {
//         toast.error(`Only ${getQuantity} quantity can be added for this item`);
//         return;
//       }
//     }
//   }

//   dispatch(
//     addToCart({
//       userId: user?.id,
//       productId: getCurrentProductId,
//       quantity: 1,
//     })
//   ).then((data) => {
//     if (data?.payload?.success) {
//       dispatch(fetchCartItems(user?.id));
//       toast.success("Product is added to cart");
//     }
//   });
// }


//   useEffect(() => {
//     setSort("price-lowtohigh");
//     setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
//   }, [categorySearchParam]);

//   useEffect(() => {
//     if (filters && Object.keys(filters).length > 0) {
//       const createQueryString = createSearchParamsHelper(filters);
//       setSearchParams(new URLSearchParams(createQueryString));
//     }
//   }, [filters]);

//   useEffect(() => {
//     if (filters !== null && sort !== null)
//       dispatch(
//         fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
//       );
//   }, [dispatch, sort, filters]);

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   console.log(productList, "productListproductListproductList");

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
//       <ProductFilter filters={filters} handleFilter={handleFilter} />
//       <div className="bg-background w-full rounded-lg shadow-sm">
//         <div className="p-4 border-b flex items-center justify-between">
//           <h2 className="text-lg font-extrabold">All Products</h2>
//           <div className="flex items-center gap-3">
//             <span className="text-muted-foreground">
//               {productList?.length} Products
//             </span>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex items-center gap-1"
//                 >
//                   <ArrowUpDownIcon className="h-4 w-4" />
//                   <span>Sort by</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-[200px]">
//                 <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
//                   {sortOptions.map((sortItem) => (
//                     <DropdownMenuRadioItem
//                       value={sortItem.id}
//                       key={sortItem.id}
//                     >
//                       {sortItem.label}
//                     </DropdownMenuRadioItem>
//                   ))}
//                 </DropdownMenuRadioGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//           {productList && productList.length > 0
//             ? productList.map((productItem) => (
//                 <ShoppingProductTile
//                   handleGetProductDetails={handleGetProductDetails}
//                   product={productItem}
//                   handleAddtoCart={handleAddtoCart}
//                 />
//               ))
//             : null}
//         </div>
//       </div>
//        <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails} 
//       /> 
//     </div>
//   );
// }

// export default ShoppingListing;

import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// Helper to generate search query string from filters
function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const categorySearchParam = searchParams.get("category");

  // Handle sorting change
  const handleSort = (value) => setSort(value);

  // Handle filtering logic
  const handleFilter = (section, option) => {
    const newFilters = { ...filters };
    if (!newFilters[section]) newFilters[section] = [option];
    else {
      const idx = newFilters[section].indexOf(option);
      if (idx === -1) newFilters[section].push(option);
      else newFilters[section].splice(idx, 1);
    }
    setFilters(newFilters);
    sessionStorage.setItem("filters", JSON.stringify(newFilters));
  };

  // Fetch product details
  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  // Add product to cart
  const handleAddtoCart = (productId, totalStock) => {
    const existingItem = cartItems?.items?.find(
      (item) => item.productId === productId
    );
    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast.error(`Only ${existingItem.quantity} quantity can be added for this item`);
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product is added to cart");
      }
    });
  };

  // Initialize filters and sort from URL / session
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  // Update search params whenever filters change
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters]);

  // Fetch filtered products whenever filters or sort change
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
  }, [dispatch, filters, sort]);

  // Open product details dialog when details are loaded
  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 p-4 md:p-6">
      {/* Sidebar Filter */}
      <ProductFilter filters={filters} handleFilter={handleFilter} />

      {/* Product Listing */}
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.id} key={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList?.length > 0 &&
            productList.map((product) => (
              <ShoppingProductTile
                key={product._id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />
            ))}
        </div>
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

export default ShoppingListing;
