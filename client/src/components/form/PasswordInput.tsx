"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import type React from "react";
import { forwardRef, useState } from "react";
import type { FieldError } from "react-hook-form";
import FormWrapper from "./FormWrapper";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: FieldError;
  description?: string;
  required?: boolean;
  showStrengthIndicator?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      error,
      description,
      required,
      showStrengthIndicator,
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const getPasswordStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      return strength;
    };

    const strength = getPasswordStrength(password);
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];

    return (
      <FormWrapper
        label={label}
        error={error}
        description={description}
        required={required}
        id={props.id}
      >
        <div className="relative">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={cn(
              "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            onChange={(e) => {
              setPassword(e.target.value);
              props.onChange?.(e);
            }}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {showStrengthIndicator && password && (
          <div className="space-y-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 w-full rounded-full bg-muted",
                    i < strength && strengthColors[strength - 1]
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Password strength: {strengthLabels[strength - 1] || "Very Weak"}
            </p>
          </div>
        )}
      </FormWrapper>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
