// import { useEffect, useState } from "react";
// import CommonForm from "../common/form";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { addressFormControls } from "@/config";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addNewAddress,
//   deleteAddress,
//   editaAddress,
//   fetchAllAddresses,
// } from "@/store/shop/address-slice";
// import AddressCard from "./address-card";
// //import { useToast } from "../ui/use-toast";
// import { toast } from "sonner"
 
// const initialAddressFormData = {
//   address: "",
//   city: "",
//   phone: "",
//   pincode: "",
//   notes: "",
// };

// function Address({ setCurrentSelectedAddress, selectedId }) {
//   const [formData, setFormData] = useState(initialAddressFormData);
//   const [currentEditedId, setCurrentEditedId] = useState(null);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { addressList } = useSelector((state) => state.shopAddress);
//   //const { toast } = useToast();

//   function handleManageAddress(event) {
//     event.preventDefault();

//     if (addressList.length >= 3 && currentEditedId === null) {
//       setFormData(initialAddressFormData);
//     //   toast({
//     //     title: "You can add max 3 addresses",
//     //     variant: "destructive",
//     //   });
//     toast.error("You can add max 3 addresses");

//       return;
//     }

//     currentEditedId !== null
//       ? dispatch(
//           editaAddress({
//             userId: user?.id,
//             addressId: currentEditedId,
//             formData,
//           })
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllAddresses(user?.id));
//             setCurrentEditedId(null);
//             setFormData(initialAddressFormData);
//             // toast({
//             //   title: "Address updated successfully",
//             // });
//             toast.success("Address added successfully");
//           }
//         })
//       : dispatch(
//           addNewAddress({
//             ...formData,
//             userId: user?.id,
//           })
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllAddresses(user?.id));
//             setFormData(initialAddressFormData);
//             // toast({
//             //   title: "Address added successfully",
//             // });
//             toast.success("Address added successfully");
//           }
//         });
//   }

//   function handleDeleteAddress(getCurrentAddress) {
//     dispatch(
//       deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllAddresses(user?.id));
//         // toast({
//         //   title: "Address deleted successfully",
//         // });
//         toast.success("Address added successfully");
//       }
//     });
//   }

//   function handleEditAddress(getCuurentAddress) {
//     setCurrentEditedId(getCuurentAddress?._id);
//     setFormData({
//       ...formData,
//       address: getCuurentAddress?.address,
//       city: getCuurentAddress?.city,
//       phone: getCuurentAddress?.phone,
//       pincode: getCuurentAddress?.pincode,
//       notes: getCuurentAddress?.notes,
//     });
//   }

//   function isFormValid() {
//     return Object.keys(formData)
//       .map((key) => formData[key].trim() !== "")
//       .every((item) => item);
//   }

//   useEffect(() => {
//     dispatch(fetchAllAddresses(user?.id));
//   }, [dispatch]);

//   console.log(addressList, "addressList");

//   return (
//     <Card>
//       <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
//         {addressList && addressList.length > 0
//           ? addressList.map((singleAddressItem) => (
//               <AddressCard
//                 selectedId={selectedId}
//                 handleDeleteAddress={handleDeleteAddress}
//                 addressInfo={singleAddressItem}
//                 handleEditAddress={handleEditAddress}
//                 setCurrentSelectedAddress={setCurrentSelectedAddress}
//               />
//             ))
//           : null}
//       </div>
//       <CardHeader>
//         <CardTitle>
//           {currentEditedId !== null ? "Edit Address" : "Add New Address"}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         <CommonForm
//           formControls={addressFormControls}
//           formData={formData}
//           setFormData={setFormData}
//           buttonText={currentEditedId !== null ? "Edit" : "Add"}
//           onSubmit={handleManageAddress}
//           isBtnDisabled={!isFormValid()}
//         />
//       </CardContent>
//     </Card>
//   );
// }

// export default Address;

import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.error("You can add max 3 addresses");
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address updated successfully");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast.success("Address added successfully");
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast.success("Address deleted successfully");
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center w-full px-3 sm:px-6 lg:px-10">
      <Card className="w-full sm:w-[90%] lg:w-[80%] shadow-md mt-5">
        {/* Address list grid */}
        <div className="mb-5 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addressList && addressList.length > 0
            ? addressList.map((singleAddressItem) => (
                <AddressCard
                  key={singleAddressItem._id}
                  selectedId={selectedId}
                  handleDeleteAddress={handleDeleteAddress}
                  addressInfo={singleAddressItem}
                  handleEditAddress={handleEditAddress}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                />
              ))
            : (
              <p className="text-center text-gray-500 col-span-full">
                No addresses added yet.
              </p>
            )}
        </div>

        {/* Form section */}
        <CardHeader className="border-t pt-4">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-center sm:text-left">
            {currentEditedId !== null ? "Edit Address" : "Add New Address"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default Address;
