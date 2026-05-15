"use client";

import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, loading, signInWithGoogle, logout } = useAuth();

  return (
    <header className="border-b shadow-sm sticky top-0 bg-white z-10 px-6 py-4 flex items-center justify-between">
      <h1 className="font-extrabold text-2xl tracking-tight text-purple-700">MyLink</h1>
      
      <div>
        {loading ? (
          <span className="text-sm text-gray-500">로딩 중...</span>
        ) : user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
              {user.displayName}님 환영합니다!
            </span>
            <Button onClick={logout} variant="outline" size="sm">로그아웃</Button>
          </div>
        ) : (
          <Button onClick={signInWithGoogle} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white font-medium">Google 로그인</Button>
        )}
      </div>
    </header>
  );
}
