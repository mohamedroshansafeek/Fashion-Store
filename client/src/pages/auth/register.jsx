// import { Link, useNavigate } from "react-router-dom"
// import { useState } from "react"
// import { registerFormControls } from "@/config"
// import CommonForm from "@/components/common/form"
// import { useDispatch } from "react-redux"
// import { registerUser } from "@/store/auth-slice"
// import { toast } from "sonner"

// const initialState = {
//     userName : '',
//     email : '',
//     password : ''
// }

// function AuthRegister(){

//   const [formData, setFormData] = useState(initialState)
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   //const {toast} = useToast()

// //   function onSubmit(event) {
// //     event.preventDefault();
// //     dispatch(registerUser(formData)).then((data)=> {
// //         if(data?.payload?.success) {
// //             toast({
// //                 title : data?.payload?.message,
// //             })
// //             navigate("/auth/login");
// //         }else{
// //              toast({
// //                 title : data?.payload?.message,
// //             })
// //         }
// //     })
// //   }

// function onSubmit(event) {
//   event.preventDefault();
//   dispatch(registerUser(formData)).then((response) => {
//     const res = response.payload; // backend response
//     if(res?.success) {
//       toast.success(res.message);  // ✅ success notification
//       navigate('/auth/login');
//     } else {
//       toast.error(res?.message || "Registration failed!",{ variant : "destructive" }); // ✅ error notification
//     }
//   });
// }

    
//   console.log(formData)

//     return(
//         <div className="mx-auto w-full max-w-md space-y-6">
//             <div className="text-center">
//                 <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
//                 <p className="mt-2 ">Already have an account
//         <Link className="font-medium text-primary hover:underline ml-3" to='/auth/login'>Login</Link>
//                 </p>
//             </div>
//             <CommonForm
//             formControls={registerFormControls}
//             buttonText={'Sign Up'}
//             formData={formData}
//             setFormData={setFormData}
//             onSubmit={onSubmit}
//             />
//         </div>
//     )
// }

// export default AuthRegister

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerFormControls } from "@/config";
import CommonForm from "@/components/common/form";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((response) => {
      const res = response.payload;
      if (res?.success) {
        toast.success(res.message);
        navigate("/auth/login");
      } else {
        toast.error(res?.message || "Registration failed!", {
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
            Create New Account
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Already have an account?{" "}
            <Link
              className="font-medium text-primary hover:underline"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Form */}
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthRegister;
