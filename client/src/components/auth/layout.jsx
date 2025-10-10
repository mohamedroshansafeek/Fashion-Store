import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel: visible on lg+ screens */}
      <div className="hidden lg:flex w-1/2 bg-black items-center justify-center px-8 lg:px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome to Glitzify
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Sign in or create an account to get started
          </p>
        </div>
      </div>

      {/* Right Panel: form / content */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
