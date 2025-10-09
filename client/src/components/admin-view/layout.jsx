import { Outlet } from "react-router-dom"
import AdminSidebar from "./sidebar"
import AdminHeader from "./header"
import { useState } from "react"


function AdminLayout() {

    const [openSidebar, setOpenSidebar] = useState(false)

    return( 
        <div className="flex min-h-screen w-full">
            {/* admin sidebar */}
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
            <div className="flex flex-1 flex-col">
                {/* admin header */}
                <AdminHeader setOpen={setOpenSidebar}/>
                <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout

// import { Outlet } from "react-router-dom";
// import AdminSidebar from "./sidebar";
// import AdminHeader from "./header";
// import { useState } from "react";

// function AdminLayout() {
//   const [openSidebar, setOpenSidebar] = useState(false);

//   return (
//     <div className="flex min-h-screen w-full">
//       {/* Sidebar: hidden on mobile by default, toggled via openSidebar */}
//       <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />

//       {/* Main content area */}
//       <div className="flex flex-1 flex-col">
//         {/* Header */}
//         <AdminHeader setOpen={setOpenSidebar} />

//         {/* Main content */}
//         <main className="flex-1 flex flex-col bg-muted/40 p-4 sm:p-6 md:p-8 overflow-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;
