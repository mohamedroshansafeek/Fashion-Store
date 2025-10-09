// import { Link, useNavigate } from "react-router-dom"
// import { useState } from "react"
// import { loginFormControls } from "@/config"
// import CommonForm from "@/components/common/form"
// import { useDispatch } from "react-redux"
// import { loginUser } from "@/store/auth-slice"
// import { toast } from "sonner"


// const initialState = {
//     email : '',
//     password : ''
// }

// function AuthLogin(){

//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   //const {toast} = useToast()

// //   function onSubmit(event){
// //         event.preventDefault();

// //         dispatch(loginUser(formData)).then(data=> {
// //            if(data?.payload?.success) {
// //              toast(data?.payload?.message, {
// //               variant : "success",
// //              });
// //               }
// //            else {
// //                 toast(data?.payload?.message, {
// //                    variant : 'destructive',
// //                 });
              
// //               }
           
// //         })
// //   }


// function onSubmit(event){
//   event.preventDefault();

//   dispatch(loginUser(formData)).then((response) => {
//     const res = response.payload;

//     if(res?.success)  {
//       toast.success(res.message)
//       navigate("/shop/home");
//     } else {
//          toast.error(res?.message || "Something went wrong!",{ variant : "destructive" }); 
//     }
//   });
// }



//     return(
//         <div className="mx-auto w-full max-w-md space-y-6">
//             <div className="text-center">
//                 <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
//                 <p className="mt-2">Don't have an account
//         <Link className="font-medium text-primary hover:underline ml-3" to='/auth/register'>Register</Link>
//                 </p>
//             </div>
//             <CommonForm
//             formControls={loginFormControls}
//             buttonText={'Sign In'}
//             formData={formData}
//             setFormData={setFormData}
//             onSubmit={onSubmit}
//             />
//         </div>
//     )
// }

// export default AuthLogin

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginFormControls } from "@/config";
import CommonForm from "@/components/common/form";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((response) => {
      const res = response.payload;

      if (res?.success) {
        toast.success(res.message);
        navigate("/shop/home");
      } else {
        toast.error(res?.message || "Something went wrong!", {
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Don't have an account?{" "}
            <Link
              className="font-medium text-primary hover:underline"
              to="/auth/register"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Form */}
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthLogin;
