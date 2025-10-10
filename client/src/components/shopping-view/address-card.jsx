import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

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
        w-full sm:w-[90%] md:w-[70%] lg:w-[60%] mx-auto mt-4`}
    >
      <CardContent className="flex flex-col gap-3 text-sm sm:text-base md:text-lg p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-semibold">Address:</span>
          <span className="break-words text-gray-700">{addressInfo?.address}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-semibold">City:</span>
          <span className="text-gray-700">{addressInfo?.city}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-semibold">Pincode:</span>
          <span className="text-gray-700">{addressInfo?.pincode}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-semibold">Phone:</span>
          <span className="text-gray-700">{addressInfo?.phone}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-semibold">Notes:</span>
          <span className="text-gray-700">{addressInfo?.notes}</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 p-4">
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
