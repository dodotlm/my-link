"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogo, Link as LinkIcon, ChartBar, UserCircleCheck, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

export default function Home() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/mypage");
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="animate-pulse w-10 h-10 bg-purple-200 rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col font-sans">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold text-xl tracking-tight text-gray-900">MyLink</span>
        </div>
        <div>
          {!user ? (
            <button 
              onClick={signInWithGoogle}
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-sm font-medium transition-colors text-gray-800"
            >
              로그인
            </button>
          ) : (
            <Link href="/mypage" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm font-medium transition-colors">
              마이페이지로
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-24 text-center">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            MyLink 정식 출시
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
            나만의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">모든 링크</span>를<br/>
            단 하나의 페이지에.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            인스타그램, 틱톡, 트위터 프로필에 들어갈 단 하나의 링크.<br className="hidden md:block"/>
            쉽고 빠르게 나만의 프로필을 만들고 공유하세요.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={signInWithGoogle}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all w-full sm:w-auto"
            >
              <GoogleLogo weight="bold" className="w-6 h-6" />
              Google로 3초 만에 시작하기
              <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">무료로 시작할 수 있습니다. 신용카드가 필요 없습니다.</p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-32 text-left">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 transition-colors">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <LinkIcon weight="bold" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">무제한 링크 등록</h3>
            <p className="text-gray-600">필요한 모든 링크를 제한 없이 등록하세요. SNS, 포트폴리오, 쇼핑몰 등 모든 것을 연결합니다.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-pink-200 transition-colors">
            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4">
              <UserCircleCheck weight="bold" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">커스텀 프로필</h3>
            <p className="text-gray-600">나만의 고유한 URL과 프로필 이미지, 소개글로 나를 가장 잘 나타내는 페이지를 꾸며보세요.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <ChartBar weight="bold" className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">방문자 통계 제공</h3>
            <p className="text-gray-600">각 링크가 얼마나 클릭되었는지 마이페이지에서 직관적으로 확인하고 분석하세요.</p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>© 2026 MyLink. All rights reserved.</p>
      </footer>
    </div>
  );
}
