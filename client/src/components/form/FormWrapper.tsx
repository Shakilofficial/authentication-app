"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";

interface FormFieldWrapperProps {
  label?: string;
  error?: FieldError;
  required?: boolean;
  description?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

const FormWrapper = ({
  label,
  error,
  required,
  description,
  children,
  className,
  id,
}: FormFieldWrapperProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      {children}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormWrapper;
