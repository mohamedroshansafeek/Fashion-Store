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
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] 
        ${
          selectedId?._id === addressInfo?._id
            ? "border-red-900 border-4"
            : "border-gray-300"
        } 
        w-full sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto mt-4`}
    >
      {/* Card Content */}
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base md:text-lg">
        {/* Each field flex for label + value */}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-semibold">Address:</span>
          <span className="break-words">{addressInfo?.address}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-semibold">City:</span>
          <span>{addressInfo?.city}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-semibold">Pincode:</span>
          <span>{addressInfo?.pincode}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-semibold">Phone:</span>
          <span>{addressInfo?.phone}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between col-span-full">
          <span className="font-semibold">Notes:</span>
          <span>{addressInfo?.notes}</span>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 p-3">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="w-full sm:w-auto"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
