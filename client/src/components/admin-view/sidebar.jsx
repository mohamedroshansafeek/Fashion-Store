import { Fragment } from "react"
import {BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket} from "lucide-react"
import { useNavigate } from "react-router-dom"
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "../ui/sheet"



const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <ShoppingBasket />
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <BadgeCheck />
    },
]

function MenuItems({setOpen}){
     const navigate = useNavigate()

    return <nav className="mt-8 flex-col flex gap-2">
        {
            adminSidebarMenuItems.map(menuItem=> <div 
                key={menuItem.id} 
                onClick={()=>{
                    navigate(menuItem.path);
                    setOpen ? setOpen(false) : null
                }}
             className="flex text-xl cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                {menuItem.icon}
                <span>{menuItem.label}</span>
            </div>)
        }
    </nav>
}


function AdminSidebar({open, setOpen}) {

    const navigate = useNavigate()

    return(
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <span className="hidden" />
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex gap-2 mt-5 mb-5 text-2xl font-extrabold">
                                <ChartNoAxesCombined size={30}/>
                                 Admin Panel
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen}/>
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick={()=>navigate('/admin/dashboard')} className="flex items-center gap-2 cursor-pointer">
                  <ChartNoAxesCombined size={30}/>  
                    <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    )
}

export default AdminSidebar

// import { Fragment } from "react";
// import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

// const adminSidebarMenuItems = [
//   { id: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard /> },
//   { id: "products", label: "Products", path: "/admin/products", icon: <ShoppingBasket /> },
//   { id: "orders", label: "Orders", path: "/admin/orders", icon: <BadgeCheck /> },
// ];

// function MenuItems({ setOpen }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <nav className="mt-6 flex flex-col gap-2">
//       {adminSidebarMenuItems.map((menuItem) => (
//         <div
//           key={menuItem.id}
//           onClick={() => {
//             navigate(menuItem.path);
//             if (setOpen) setOpen(false);
//           }}
//           className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
//             location.pathname.startsWith(menuItem.path)
//               ? "bg-muted text-foreground font-semibold"
//               : "text-muted-foreground hover:bg-muted hover:text-foreground"
//           }`}
//         >
//           {menuItem.icon}
//           <span className="truncate">{menuItem.label}</span>
//         </div>
//       ))}
//     </nav>
//   );
// }

// function AdminSidebar({ open, setOpen }) {
//   return (
//     <Fragment>
//       {/* Mobile Sidebar only */}
//       <Sheet open={open} onOpenChange={setOpen}>
//         <SheetTrigger asChild>
//           <span className="hidden" /> {/* Trigger handled by header button */}
//         </SheetTrigger>
//         <SheetContent side="left" className="w-64 p-4">
//           <div className="flex flex-col h-full">
//             <SheetHeader className="border-b mb-4">
//               <SheetTitle className="flex items-center gap-2 text-2xl font-extrabold">
//                 <ChartNoAxesCombined size={28} />
//                 Admin Panel
//               </SheetTitle>
//             </SheetHeader>
//             <MenuItems setOpen={setOpen} />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   );
// }

// export default AdminSidebar;
