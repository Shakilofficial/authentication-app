"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import FormWrapper from "./FormWrapper";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  description?: string;
  required?: boolean;
  variant?: "default" | "ghost" | "outline";
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      description,
      required,
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    const inputVariants = {
      default: "",
      ghost:
        "border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-ring",
      outline: "border-2 focus-visible:ring-0 focus-visible:border-primary",
    };

    return (
      <FormWrapper
        label={label}
        error={error}
        description={description}
        required={required}
        id={props.id}
      >
        <Input
          ref={ref}
          className={cn(
            inputVariants[variant],
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
      </FormWrapper>
    );
  }
);

TextInput.displayName = "TextInput";
