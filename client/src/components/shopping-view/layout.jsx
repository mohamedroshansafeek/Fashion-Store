// import { Outlet } from "react-router-dom"
// import ShoppingHeader from "./header"

// function ShoppingLayout() {
//     return(
//         <div className="flex flex-col bg-white overflow-hidden">
//             {/* common header */}
//             <ShoppingHeader/>
//             <main className="flex flex-col w-full">
//                 <Outlet />
//             </main>
//         </div>
//     )
// }
// export default ShoppingLayout

import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      {/* Common Header */}
      <ShoppingHeader />

      {/* Main Content Area */}
      <main className="flex flex-col flex-grow w-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
