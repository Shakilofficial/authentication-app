/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signUpSchema } from "@/schemas/authSchemas";
import { registerUser } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/button";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(signUpSchema) });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FieldValues) => {
    try {
      const result = await registerUser(data);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.message || "Signup failed");
      }
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
        <label className=" haunt-medium">Password</label>
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
      <div>
        <label className="block text-sm font-medium">Shop Names (3-4)</label>
        {[1, 2, 3, 4].map((i) => (
          <input
            key={i}
            {...register(`shopNames.${i - 1}`)}
            className="w-full p-2 border rounded-md mt-2"
            placeholder={`Shop ${i}`}
            onChange={(e) =>
              setValue(`shopNames.${i - 1}`, e.target.value, {
                shouldValidate: true,
              })
            }
          />
        ))}
        {errors.shopNames && (
          <p className="text-red-500 text-sm">{errors.shopNames.message}</p>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignupForm;
