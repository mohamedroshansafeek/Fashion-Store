// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import accImg from "../../assets/account.jpg";
// import Address from "@/components/shopping-view/address";
// import ShoppingOrders from "@/components/shopping-view/orders";

// function ShoppingAccount() {
//   return (
//     <div className="flex flex-col">
//       <div className="relative h-[300px] w-full overflow-hidden">
//         <img
//           src={accImg}
//           className="h-full w-full object-cover object-center"
//         />
//       </div>
//       <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
//         <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
//           <Tabs defaultValue="orders">
//             <TabsList>
//               <TabsTrigger value="orders">Orders</TabsTrigger>
//               <TabsTrigger value="address">Address</TabsTrigger>
//             </TabsList>
//             <TabsContent value="orders">
//               <ShoppingOrders />
//             </TabsContent>
//             <TabsContent value="address">
//               <Address />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingAccount;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col w-full">
      {/* Banner Image */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="Account Banner"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 grid grid-cols-1 gap-6">
        <div className="flex flex-col rounded-lg border bg-background p-4 sm:p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="pt-4">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address" className="pt-4">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
