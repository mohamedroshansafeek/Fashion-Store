// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Label } from "../ui/label";

// function AddressCard({
//   addressInfo,
//   handleDeleteAddress,
//   handleEditAddress,
//   setCurrentSelectedAddress,
//   selectedId,
// }) {
//   return (
//     <Card
//       onClick={
//         setCurrentSelectedAddress
//           ? () => setCurrentSelectedAddress(addressInfo)
//           : null
//       }
//       className={`cursor-pointer border-red-700 ${
//         selectedId?._id === addressInfo?._id
//           ? "border-red-900 border-[4px]"
//           : "border-black"
//       }`}
//     >
//       <CardContent className="grid p-4 gap-4">
//         <Label>Address: {addressInfo?.address}</Label>
//         <Label>City: {addressInfo?.city}</Label>
//         <Label>pincode: {addressInfo?.pincode}</Label>
//         <Label>Phone: {addressInfo?.phone}</Label>
//         <Label>Notes: {addressInfo?.notes}</Label>
//       </CardContent>
//       <CardFooter className="p-3 flex justify-between">
//         <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
//         <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
//       </CardFooter>
//     </Card>
//   );
// }

// export default AddressCard;

// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Label } from "../ui/label";

// function AddressCard({
//   addressInfo,
//   handleDeleteAddress,
//   handleEditAddress,
//   setCurrentSelectedAddress,
//   selectedId,
// }) {
//   return (
//     <Card
//       onClick={
//         setCurrentSelectedAddress
//           ? () => setCurrentSelectedAddress(addressInfo)
//           : null
//       }
//       className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
//         ${
//           selectedId?._id === addressInfo?._id
//             ? "border-red-900 border-[3px]"
//             : "border-gray-400"
//         }
//         w-full sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto mt-4
//         `}
//     >
//       <CardContent
//         className="grid gap-3 p-4 text-sm sm:text-base md:text-lg 
//                    sm:grid-cols-2 md:grid-cols-3"
//       >
//         <Label className="break-words">
//           <span className="font-semibold">Address:</span> {addressInfo?.address}
//         </Label>
//         <Label>
//           <span className="font-semibold">City:</span> {addressInfo?.city}
//         </Label>
//         <Label>
//           <span className="font-semibold">Pincode:</span> {addressInfo?.pincode}
//         </Label>
//         <Label>
//           <span className="font-semibold">Phone:</span> {addressInfo?.phone}
//         </Label>
//         <Label className="col-span-full">
//           <span className="font-semibold">Notes:</span> {addressInfo?.notes}
//         </Label>
//       </CardContent>

//       <CardFooter
//         className="flex flex-col sm:flex-row justify-between gap-2 p-3"
//       >
//         <Button
//           onClick={() => handleEditAddress(addressInfo)}
//           className="w-full sm:w-auto"
//         >
//           Edit
//         </Button>
//         <Button
//           onClick={() => handleDeleteAddress(addressInfo)}
//           className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
//         >
//           Delete
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

// export default AddressCard;

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={() => setCurrentSelectedAddress && setCurrentSelectedAddress(addressInfo)}
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
        ${
          selectedId?._id === addressInfo?._id
            ? "border-red-900 border-[3px]"
            : "border-gray-400"
        }
        w-full sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto mt-4
      `}
    >
      <CardContent className="grid gap-3 p-4 text-sm sm:text-base md:text-lg 
                              sm:grid-cols-2 md:grid-cols-3">
        <Label className="break-words">
          <span className="font-semibold">Address:</span> {addressInfo?.address}
        </Label>
        <Label>
          <span className="font-semibold">City:</span> {addressInfo?.city}
        </Label>
        <Label>
          <span className="font-semibold">Pincode:</span> {addressInfo?.pincode}
        </Label>
        <Label>
          <span className="font-semibold">Phone:</span> {addressInfo?.phone}
        </Label>
        <Label className="col-span-full break-words">
          <span className="font-semibold">Notes:</span> {addressInfo?.notes}
        </Label>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-3">
        <Button
          onClick={(e) => { e.stopPropagation(); handleEditAddress(addressInfo); }}
          className="w-full sm:w-auto"
        >
          Edit
        </Button>
        <Button
          onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addressInfo); }}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
