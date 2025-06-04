/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AuthContext } from "@/context/AuthContext";
import { signInSchema } from "@/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/button";

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInSchema) });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FieldValues) => {
    try {
      await login(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          {...register("username")}
          className="w-full p-2 border rounded-md"
          placeholder="Enter username"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded-md"
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="flex items-center">
        <input type="checkbox" {...register("rememberMe")} className="mr-2" />
        <label className="text-sm font-medium">Remember Me</label>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default SigninForm;
