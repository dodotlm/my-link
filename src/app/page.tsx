"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogo, UserCircleCheck } from "@phosphor-icons/react";

export default function Home() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-12 bg-gray-50 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">MyLink</h1>
        <p className="text-xl text-gray-600 max-w-sm">All your essential links in one beautifully simple place</p>
      </div>
      
      <div className="flex flex-col gap-4">
        <button 
          onClick={signInWithGoogle}
          className="flex flex-1 items-center justify-center gap-3 px-8 py-3 bg-white text-gray-800 font-bold rounded-full shadow hover:shadow-lg transition-all border border-gray-200"
        >
          <GoogleLogo weight="fill" className="w-6 h-6 text-blue-500" />
          Continue with Google
        </button>
      </div>

      <div className="absolute bottom-10 flex gap-2 items-center text-gray-400 font-medium text-sm">
        <UserCircleCheck className="w-5 h-5"/> Free, Easy & Fast
      </div>
    </div>
  );
}
