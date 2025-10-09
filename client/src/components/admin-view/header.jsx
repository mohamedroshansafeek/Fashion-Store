// import { useDispatch } from "react-redux"
// import { Button } from "../ui/button"
// import {Menu, LogOut} from "lucide-react"
// import { logoutUser } from "@/store/auth-slice";

// function AdminHeader({setOpen}) {
//    const dispatch = useDispatch();

//    function handleLogout() {
//       dispatch(logoutUser());
//    }

   
//     return(
//        <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
//          <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
//             <Menu />
//             <span className="sr-only">Toggle Menu</span>
//          </Button>
//          <div className="flex flex-1 justify-end">
//             <Button onClick={handleLogout} className="inline-flex gab-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
//                  <LogOut />
//                 Logout</Button>
//          </div>
//        </header>
//     )
// }

// export default AdminHeader

import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Menu, LogOut } from "lucide-react";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      {/* Mobile menu button: visible on small screens only */}
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <Menu className="w-5 h-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Right side: logout button */}
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
