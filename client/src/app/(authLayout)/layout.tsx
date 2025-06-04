import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-300/30 via-lime-200/20 to-teal-300/30 pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20 animate-fade-in space-y-6">
        <h1 className="text-center text-2xl md:text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-200 drop-shadow-md">
          Authentication App
        </h1>
        <p className="text-center text-lg text-emerald-900 dark:text-emerald-300">
          Secure and seamless authentication experience.
        </p>

        <div className="w-full max-w-md bg-transparent backdrop-blur-lg border border-emerald-700/40 rounded-2xl shadow-xs shadow-black/30 dark:shadow-black/10 p-8 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
