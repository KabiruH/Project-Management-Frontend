import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import apiClient from '../services/apiClient';
import AuthLayout from '../components/surfaces/authLayout';
import Button from "../components/common/Button"
import Checkbox from '../components/common/Checkbox';
import InputContainer from "../components/surfaces/InputContainer"

import { useAuth } from '../hooks/authContext';
const inputConfig = [{label: 'Username',placeholder: "Enter Username",type: "text",name: "username"}, {label: 'Password',placeholder: "Enter Password",type: "password",name: "password"}];

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

const Signin = ()=>{
  const [loginError, setLoginError] = useState(false)
  const { login } = useAuth();
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })

      const registerFunction = (name) => register(name)

      const onSubmit = async(data) => {
      
        try {
          const response = await apiClient.post('api/User/Login', data)
          const OurData = response.data
            localStorage.setItem('token',OurData.token) 
            navigate('/dashboard')
        } catch (error) {
          setLoginError(true)
          setTimeout(()=>{
            setLoginError(false)
          },2000)
        } 
           }
      return(
          <AuthLayout>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>
              {loginError && <div role="alert">
                  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Login Failed
                  </div>
                  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>Invalid username or password.</p>
                  </div>
              </div>}
              <div>
              <div className='flex flex-col gap-2'>
                <h2 color='secondary' className='text-secondary subtitle1'>Sign In</h2>
                <p className='text-greys body1' >Enter your username and password to sign in!</p>
               </div>
              </div>
               <div className='flex flex-col gap-5'>
                {inputConfig.map((field,index)=><InputContainer error={errors[field.name]?.message} name={field.name} registerFunction={registerFunction} key={index} label={field.label} placeholder={field.placeholder} type={field.type} />)}
               <div className='flex flex-row justify-between'>
                <Checkbox  label="Keep me logged in" />
                <a className='bodyLarge text-primary' href='/forgot-password'>forgot password?</a>
               </div>
               <div>
                <Button  className="bg-primary text-white w-full">Sign In</Button>
               </div>
               <div>
                <p className='flex flex-row gap-2'>
                    <span className='body2 text-secondary'>Not registered yet?</span>
                    <a className='bodyLarge text-primary cursor-pointer' href='/signup'>Create an Account</a>
                </p>
               </div>
               </div>
              </form>
          </AuthLayout>
      )
}
    
export default Signin;






















// import React, { useState } from 'react';
// import { useNavigate, Link, NavLink } from 'react-router-dom';
// import { loginUser } from '../services/userS'

// function Signin({ handleLogin }) {
//   const [username, setUsername] = useState(''); // Changed from email to username
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       const userData = { username, password };
//       const data = await loginUser(userData);
//       console.log(data); // Log successful response
//       handleLogin(data); // Call your handleLogin function
//       navigate("/dashboard"); // Navigate to dashboard on success
//     } catch (error) {
//       setIsLoading(false);
//       setError(error.response?.data?.message || 'Unknown error occurred.');
//     }
//   };

//   return (
//     <section className="gradient-form h-screen bg-white flex items-center justify-center ">
//       <div className="container h-full p-10 mx-auto">
//         <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
//           <div className="w-auto border border-gray-300 rounded-2xl p-4">
//             <div className="block rounded-3xl">
//               <div className="g-0 lg:flex lg:flex-wrap">
//                 {/* Left column container */}
//                 <div>
//                   <div className="md:mx-2 md:p-12">
//                     {/* Logo */}
//                     <NavLink to='/'>
//                       <div className="text-center">
//                         <img
//                           className="mx-auto w-52"
//                           src="https://www.presidentsaward.or.ke/wp-content/uploads/2023/08/logo_blue.png"
//                           alt="logo"
//                         />
//                       </div>
//                     </NavLink>
//                     <div className='text-center'>
//                       <p className="mb-1 mt-5 pb-1 text-2xl font-semibold text-blue-900">The President's Award - Kenya</p>
//                     </div>

//                     <form onSubmit={handleSubmit}>
//                       <div className='text-center'>
//                         <p className="relative mb-2 text-zinc-500 font-semibold">Please login to your account</p>
//                       </div>

                    
//                       <br />
//                       {error && <div className="error text-red-500 font-bold text-center">{error}</div>}
//                       <div className="relative mb-4" data-te-input-wrapper-init>
//                         <label htmlFor="username" className="mb-0 mr-2 text-zinc-700">
//                           Username:
//                         </label>
//                         <input
//                           type="text"
//                           value={username}
//                           onChange={(e) => setUsername(e.target.value)}
//                           className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral [&:not([data-te-input-placeholder-active])]"
//                           id="username"
//                           placeholder="Username"
//                           autoComplete="off"
//                           required
//                         />
//                       </div>

//                       <div className="relative mb-4" data-te-input-wrapper-init>
//                         <label htmlFor="password" className="mb-0 mr-2 text-zinc-700">
//                           Password:
//                         </label>
//                         <input
//                           type="password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral [&:not([data-te-input-placeholder-active])]"
//                           id="password"
//                           placeholder="Password"
//                           required
//                         />
//                       </div>

                   
//                       <div className="mb-12 pb-1 pt-1 text-center">
//                         <button
//                           className="mb-3 bg-primary inline-block w-full rounded-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
//                           type="submit"
//                           disabled={isLoading}
//                           data-te-ripple-init
//                           data-te-ripple-color="light"
//                         >
//                           {isLoading ? 'Loading...' : 'Log In'}
//                         </button>

                      
//                         <Link to="/reset" className="mb-0 mr-2 text-zinc-600">Forgot password?</Link>
//                       </div>

//                       <div className="flex items-center justify-between pb-6">
//                         <p className="mb-0 mr-2 text-zinc-500">Don't have an account?</p>
//                         <Link
//                           to="/signup"
//                           type="button"
//                           className="inline-block rounded-full border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal  text-white transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
//                           data-te-ripple-init
//                           data-te-ripple-color="light"
//                           style={{
//                             background: ' #F9500D'
//                           }}
//                         >
//                           Register
//                         </Link>
//                       </div>
//                     </form>
                    
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Signin;

