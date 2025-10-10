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
