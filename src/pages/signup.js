import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import AuthLayout from '../components/surfaces/authLayout';
import Button from "../components/common/Button"
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient'
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
const [loading,setLoading] =useState(false)
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
        setLoading(true)
        try{
          const response =  await apiClient.post('api/User',{
            idNo: data.IdNumber.toString(),
            username: data.username,
            name: data.fullNames,
            roleID: data.role,
            gender: data.gender,
            phoneNo: data.pNumber.toString(),
            email: data.email,
            password:  data.password,
          })
          setLoading(false)
          navigate('/dashboard')
          return response.data
        }catch(err){
          console.log(err)
        }
        

      

      }

      return(
          <AuthLayout>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 md:gap-10 w-10/12'>
              <div>
              <div className='flex flex-col gap-2'>
                <h2 color='secondary' className='text-secondary subtitle1'>Register</h2>
                <p className='text-greys body1' >Enter your details below to sign up!</p>
              </div>
              </div>
               <div className='grid md:grid-cols-2 gap-2 w-full'>
                {inputConfig.map((field,index)=><InputContainer error={errors[field.name]?.message} name={field.name} registerFunction={registerFunction} key={index} label={field.label} placeholder={field.placeholder} type={field.type} />)}
                <Autocomplete registerFunction={registerFunction} options={[{name: "Male"},{name: "Female"}]} label="Gender" name='gender' error={errors.gender?.message}/>
                <Autocomplete registerFunction={registerFunction} options={[{name: "Helper"},{name: "Participant"}]} label="Role" name='role' error={errors.role?.message}/>
                <InputContainer error={errors.password?.message} name='password' registerFunction={registerFunction} label='Password' type='password' placeholder='Enter Password' />
               </div>
               <div>
                <Button  className="bg-primary text-white w-full">{loading ? 'Loading...' : 'Register'}</Button>
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