import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import apiClient from '../../services/apiClient';
import AuthLayout from '../../components/surfaces/authLayout';
import Button from "../../components/common/Button"
import Checkbox from '../../components/common/Checkbox';
import InputContainer from "../../components/surfaces/InputContainer"

const inputConfig = [{label: 'Email',placeholder: "Enter Email",type: "email",name: "email"}];

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

const ForgotPassword = ()=>{
  const [loginError, setLoginError] = useState(false)
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
          const now = Date.now();
          const expiryTime = now + 1440 * 60 * 1000;
          const response = await apiClient.post('api/User/Login', data)
          const OurData = response.data
            localStorage.setItem('token',OurData.token) 
            localStorage.setItem('tokenExpiry', expiryTime);
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
                <h2 color='secondary' className='text-secondary subtitle1'>Forgot Password</h2>
                <p className='text-greys body1' >Enter your email to recieve a reset link!</p>
               </div>
              </div>
               <div className='flex flex-col gap-5'>
                {inputConfig.map((field,index)=><InputContainer error={errors[field.name]?.message} name={field.name} registerFunction={registerFunction} key={index} label={field.label} placeholder={field.placeholder} type={field.type} />)}
               <div className='flex flex-row justify-between'>
               </div>
               <div>
                <Button className="bg-primary text-white w-full">Reset Password</Button>
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
    
export default ForgotPassword;
















