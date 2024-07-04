import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AuthLayout from '../components/surfaces/authLayout';
import Button from "../components/common/Button"

import InputContainer from "../components/surfaces/InputContainer"
import Autocomplete from '../components/common/AutoComplete';

const inputConfig = [{label: 'Username',placeholder: "Enter Username",type: "text",name: "username"}, {label: 'Full Names',placeholder: "Enter Full Names",type: "text",name: "fullNames"},{label: 'Email',placeholder: "Enter Email",type: "email",name: "email"},{label: 'Phone Number',placeholder: "Enter Phone Number",type: "number",name: "pNumber"},{label: 'ID Number',placeholder: "Enter ID Number",type: "number",name: "IdNumber"}];

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    fullNames: yup.string().required("Full Names is required"),
    email: yup.string().required("Email is required"),
    pNumber: yup.number().required("Phone Number is required"),
    IdNumber: yup.number().required("Id Number is required"),
    role: yup.string().required("Please select a role"),
    gender: yup.string().required("Please select your gender"),
    password: yup.string().required("Password is required"),
  })
  .required()

const Signin = ()=>{

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })

      const registerFunction = (name) => register(name)

      const onSubmit = (data) => console.log(data)

      return(
          <AuthLayout>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 md:gap-10 w-10/12'>
              <div>
              <div className='flex flex-col gap-2'>
                <h2 color='secondary' className='text-secondary subtitle1'>Sign Up</h2>
                <p className='text-greys body1' >Enter your details below to sign up!</p>
              </div>
              </div>
               <div className='grid md:grid-cols-2 gap-2 w-full'>
                {inputConfig.map((field,index)=><InputContainer error={errors[field.name]?.message} name={field.name} registerFunction={registerFunction} key={index} label={field.label} placeholder={field.placeholder} type={field.type} />)}
                <Autocomplete registerFunction={registerFunction} options={[{name: "Male"},{name: "Female"}]} label="Gender" name='gender' error={errors.gender?.message}/>
                <Autocomplete registerFunction={registerFunction} options={[{name: "Admin"},{name: "Staff"}]} label="Role" name='role' error={errors.role?.message}/>
                <InputContainer error={errors.password?.message} name='password' registerFunction={registerFunction} label='Password' type='password' placeholder='Enter Password' />
               </div>
               <div>
                <Button  className="bg-primary text-white w-full">Sign Up</Button>
               </div>
               <div>
                <p className='flex flex-row  gap-2'>
                    <span className='body2 text-secondary'>Already have an account?</span>
                    <a className='bodyLarge text-primary cursor-pointer' href='/signin'>Sign In</a>
                </p>
               </div>
              </form>
          </AuthLayout>
      )
}
    
export default Signin;

























// import React, { useState } from 'react';
// import { useNavigate, Link, NavLink } from 'react-router-dom';

// function Signup({ handleLogin }) {
//     const [username, setUsername] = useState('');
//     const [name, setName] = useState('');
//     const [roleID, setRoleID] = useState('');
//     const [gender, setGender] = useState('');
//     const [idNo, setIdNo] = useState('');
//     const [phoneNo, setPhoneNo] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setIsLoading(true);
//         setError(null);
      
//         if (password === confirmPassword) {
//           fetch('http://localhost:5000/api/User', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username, name, roleID, gender, idNo, phoneNo, email, password }),
//           })
//             .then((response) => {
//               setIsLoading(false);
      
//               if (response.ok) {
//                 response.json().then((data) => {
//                   console.log('Success:', data);
                  
//                   navigate("/dashboard");
//                 });
//               } else {
//                 response.text().then((text) => {
//                   try {
//                     const json = JSON.parse(text);
//                     setError(json.errors);
//                   } catch (e) {
//                     console.error('Failed to parse JSON:', text);
//                     setError(text || 'An unexpected error occurred.');
//                   }
//                 });
//               }
//             })
//             .catch((error) => {
//               console.error('Fetch error:', error);
//               setIsLoading(false);
//               setError('An unexpected error occurred.');
//             });
//         } else {
//           setError('Password Mismatch');
//           setIsLoading(false);
//         }
//       };
      

//     return (
//         <section className="gradient-form h-screen bg-white flex items-center justify-center">
//             <div className="container h-full p-10 mx-auto">
//                 <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
//                     <div className="w-auto border border-gray-300 rounded-2xl p-4">
//                         <div className="block rounded-3xl">
//                             <div className="g-0 lg:flex lg:flex-wrap">
//                                 <div className="md:mx-6 md:p-12">
//                                     <NavLink to='/'>
//                                         <div className="text-center">
//                                             <img
//                                                 className="mx-auto"
//                                                 src="https://www.presidentsaward.or.ke/wp-content/uploads/2023/08/logo_blue.png"
//                                                 alt="logo"
//                                             />
//                                         </div>
//                                     </NavLink>
//                                     <div className='text-center'>
//                                         <p className="mb-1 mt-5 pb-1 text-2xl font-semibold text-blue-900">The President's Award - Kenya</p>
//                                     </div>
//                                     <form onSubmit={handleSubmit}>
//                                         {error && <div className="error text-red-500 font-bold text-center">{error}</div>} <br />

//                                         <div className="relative mb-2 text-zinc-400" data-te-input-wrapper-init>
//                                             <label htmlFor="username" className="mb-0 mr-2 text-zinc-700">
//                                                 Username:
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={username}
//                                                 onChange={(e) => setUsername(e.target.value)}
//                                                 className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
//                                                 id="username"
//                                                 placeholder="Username"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="relative mb-2 text-zinc-400" data-te-input-wrapper-init>
//                                             <label htmlFor="name" className="mb-0 mr-2 text-zinc-700">
//                                                 Name:
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={name}
//                                                 onChange={(e) => setName(e.target.value)}
//                                                 className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
//                                                 id="name"
//                                                 placeholder="Name"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="relative mb-2 text-zinc-400" data-te-input-wrapper-init>
//                                             <label htmlFor="roleID" className="mb-0 mr-2 text-zinc-700">
//                                                 Role ID:
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={roleID}
//                                                 onChange={(e) => setRoleID(e.target.value)}
//                                                 className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
//                                                 id="roleID"
//                                                 placeholder="Role ID"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="relative mb-2 text-zinc-400" data-te-input-wrapper-init>
//                                             <label htmlFor="gender" className="mb-0 mr-2 text-zinc-700">
//                                                 Gender:
//                                             </label>
//                                             <select
//                                                 name="partnerType"
//                                                 value={gender}
//                                                 onChange={(e) => setGender(e.target.value)}
//                                                 className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
//                                                 id="gender"
//                                                 required >
//                                                 <option value="">Select Gender</option>
//                                                 <option value="current">Male</option>
//                                                 <option value="upcoming">Female</option>

//                                             </select>
//                                         </div>

//                                         <div className="relative mb-2 text-zinc-400" data-te-input-wrapper-init>
//                                             <label htmlFor="idNo" className="mb-0 mr-2 text-zinc-700">
//                                                 ID Number:
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={idNo}
//                                                 onChange={(e) => setIdNo(e.target.value)}
//                                                 className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
//                                                 id="idNo"
//                                                 placeholder="ID Number"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="relative mb-2 text-zinc-400" data-te-input-wrapper-init>
//                                             <label htmlFor="phoneNo" className="mb-0 mr-2 text-zinc-700">
//                                                 Phone Number:
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={phoneNo}
//                                                 onChange={(e) => setPhoneNo(e.target.value)}
//                                                 className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
//                                                 id="phoneNo"
//                                                 placeholder="Phone Number"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="relative mb-2" data-te-input-wrapper-init>
//                                             <label htmlFor="email" className="mb-0 mr-2 text-zinc-700">
//                                                 E-mail:
//                                             </label>
//                                             <input
//                                                 type="email"
//                                                 value={email}
//                                                 onChange={(e) => setEmail(e.target.value)}
//                                                 className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
//                                                 id="email"
//                                                 placeholder="E-mail"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="relative mb-2" data-te-input-wrapper-init>
//                                             <label htmlFor="password" className="mb-0 mr-2 text-zinc-700">
//                                                 Password:
//                                             </label>
//                                             <input
//                                                 type="password"
//                                                 value={password}
//                                                 onChange={(e) => setPassword(e.target.value)}
//                                                 className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
//                                                 id="password"
//                                                 placeholder="Password"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="relative mb-2" data-te-input-wrapper-init>
//                                             <label htmlFor="confirm-password" className="mb-0 mr-2 text-zinc-700">
//                                                 Confirm Password:
//                                             </label>
//                                             <input
//                                                 type="password"
//                                                 value={confirmPassword}
//                                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                                 className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]"
//                                                 id="confirm-password"
//                                                 placeholder="Confirm Password"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="mb-2 pb-1 pt-1 text-center">
//                                             <button
//                                                 className="mb-3 inline-block w-full rounded-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-grey shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
//                                                 type="submit"
//                                                 disabled={isLoading}
//                                                 data-te-ripple-init
//                                                 data-te-ripple-color="light"
//                                                 style={{ background: '#F9500D' }}
//                                             >
//                                                 {isLoading ? 'Loading...' : 'Sign Up'}
//                                             </button>
//                                         </div>

//                                         <br />
//                                         <div className="flex items-center justify-between pb-6 text-zinc-700">
//                                             <p className="mb-0 mr-2">Already have an account?</p>
//                                             <Link
//                                                 to={'/signin'}
//                                                 className="inline-block rounded-full border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
//                                                 data-te-ripple-init
//                                                 data-te-ripple-color="light"
//                                                 style={{ background: '#F9500D' }}
//                                             >
//                                                 Login
//                                             </Link>
//                                         </div>
//                                     </form>
//                                     <div className='text-center'>
//                                         <p className="mb-1 mt-5 pb-1 text-xl font-semibold text-red-400">Proud to be</p>
//                                         <p className="mb-1 mt-0 pb-1 text-xl font-semibold text-blue-900">The Duke of Edinburgh's International Award</p>
//                                         <p className="mb-2 pb-1 text-xl font-semibold text-red-400">in Kenya</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Signup;
