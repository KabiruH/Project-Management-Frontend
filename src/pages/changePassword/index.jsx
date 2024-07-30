import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiClient from "../../services/apiClient";
import AuthLayout from "../../components/surfaces/authLayout";
import Button from "../../components/common/Button";
import InputContainer from "../../components/surfaces/InputContainer";

const inputConfig = [
  {
    label: "New password",
    placeholder: "Enter New Password",
    type: "password",
    name: "password",
  },
];

const schema = yup
  .object({
    password: yup.string().required(),
  })
  .required();

const ChangePassword = () => {
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerFunction = (name) => register(name);

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post("api/User/Login", data);
      const OurData = response.data;

      navigate("/login");
    } catch (error) {
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 2000);
    }
  };
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        {loginError && (
          <div role="alert">
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Password Reset Failed
            </div>
            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>Email not found.</p>
            </div>
          </div>
        )}
        <div>
          <div className="flex flex-col gap-2">
            <h2 color="secondary" className="text-secondary subtitle1">
              Change Password
            </h2>
            <p className="text-greys body1">Please enter your new password!</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {inputConfig.map((field, index) => (
            <InputContainer
              error={errors[field.name]?.message}
              name={field.name}
              registerFunction={registerFunction}
              key={index}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
            />
          ))}
          <div className="flex flex-row justify-between"></div>
          <div>
            <Button className="bg-primary text-white w-full">
              change Password
            </Button>
          </div>
          <div>
            <p className="flex flex-row gap-2">
              <span className="body2 text-secondary">Not registered yet?</span>
              <a
                className="bodyLarge text-primary cursor-pointer"
                href="/signup">
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ChangePassword;
