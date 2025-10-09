// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({ isAuthenticated, user, children }) {
//   const location = useLocation();

//   // Root route
//   if (location.pathname === "/") {
//     if (!isAuthenticated) {
//       return <Navigate to="/auth/login" replace />;
//     } else {
//       return user?.role === "admin" ? (
//         <Navigate to="/admin/dashboard" replace />
//       ) : (
//         <Navigate to="/shop/home" replace />
//       );
//     }
//   }

//   // Not authenticated → block everything except login/register
//   if (
//     !isAuthenticated &&
//     !(
//       location.pathname.includes("/auth/login") ||
//       location.pathname.includes("/auth/register")
//     )
//   ) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   // Authenticated → block login/register pages
//   if (
//     isAuthenticated &&
//     (location.pathname.includes("/auth/login") ||
//       location.pathname.includes("/auth/register"))
//   ) {
//     return user?.role === "admin" ? (
//       <Navigate to="/admin/dashboard" replace />
//     ) : (
//       <Navigate to="/shop/home" replace />
//     );
//   }

//   // Prevent role crossing
//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.startsWith("/admin")
//   ) {
//     return <Navigate to="/unauth-page" replace />;
//   }

//   if (
//     isAuthenticated &&
//     user?.role === "admin" &&
//     location.pathname.startsWith("/shop")
//   ) {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   return <>{children}</>;
// }

// export default CheckAuth;

import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // Routes allowed without authentication
  const authRoutes = ["/auth/login", "/auth/register"];

  //  Root route "/"
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/shop/home" replace />
    );
  }

  //  Unauthenticated users → block protected routes
  if (!isAuthenticated && !authRoutes.some((route) => path.includes(route))) {
    return <Navigate to="/auth/login" replace />;
  }

  //  Authenticated users → block login/register
  if (isAuthenticated && authRoutes.some((route) => path.includes(route))) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/shop/home" replace />
    );
  }

  //  Prevent role crossing
  if (isAuthenticated) {
    if (user?.role === "admin" && path.startsWith("/shop")) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user?.role !== "admin" && path.startsWith("/admin")) {
      return <Navigate to="/unauth-page" replace />;
    }
  }

  // 5️⃣ Otherwise allow access
  return <>{children}</>;
}

export default CheckAuth;
