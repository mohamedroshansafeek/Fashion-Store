import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";

// function AdminProductTile({
//   product,
//   setFormData,
//   setOpenCreateProductsDialog,
//   setCurrentEditedId,
//   handleDelete,
// }) {
//   return (
//     <Card className="w-full max-w-sm mx-auto">
//       <div className="flex flex-col">
//         {/* Product Image */}
//         <div className="relative">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-[250px] sm:h-[280px] md:h-[300px] object-cover rounded-t-lg"
//           />
//         </div>

//         {/* Product Info */}
//         <CardContent className="flex flex-col gap-2">
//           <h2 className="text-lg sm:text-xl font-bold mt-2">{product?.title}</h2>
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary`}
//             >
//               ${product?.price}
//             </span>
//             {product?.salePrice > 0 && (
//               <span className="text-lg sm:text-lg font-bold text-primary">
//                 ${product?.salePrice}
//               </span>
//             )}
//           </div>
//         </CardContent>

//         {/* Action Buttons */}
//         <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-2">
//           <Button
//             className="w-full sm:w-auto"
//             onClick={() => {
//               setOpenCreateProductsDialog(true);
//               setCurrentEditedId(product?._id);
//               setFormData(product);
//             }}
//           >
//             Edit
//           </Button>
//           <Button
//             className="w-full sm:w-auto"
//             variant="destructive"
//             onClick={() => handleDelete(product?._id)}
//           >
//             Delete
//           </Button>
//         </CardFooter>
//       </div>
//     </Card>
//   );
// }

// export default AdminProductTile;
