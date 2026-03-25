"use client";

import { useEffect, useState, use } from "react";
import { getUserByNickname, getUserLinks, UserProfile, LinkItem } from "@/lib/db";
import { notFound } from "next/navigation";

export default function PublicPage({ params }: { params: Promise<{ nickname: string }> }) {
  const { nickname } = use(params);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [nickname]);

  const fetchData = async () => {
    const p = await getUserByNickname(nickname);
    if (!p) {
      setLoading(false);
      return;
    }
    setProfile(p);
    const l = await getUserLinks(p.uid);
    setLinks(l);
    setLoading(false);
  };

  const handleLinkClick = (url: string) => {
    // In Phase 2: Update click count here via a tracking API
    window.open(url, "_blank");
  };

  if (loading) return (
    <div className="flex bg-gray-50 min-h-screen items-center justify-center">
      <div className="animate-pulse w-12 h-12 bg-gray-200 rounded-full"></div>
    </div>
  );
  
  if (!profile) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center w-full">
      <div className="max-w-md w-full bg-white min-h-screen shadow-2xl p-6 py-12 space-y-10 flex flex-col items-center">
        
        {/* Profile Section */}
        <section className="flex flex-col items-center space-y-5 w-full">
          <div className="relative">
            {profile.photoURL ? (
              <img src={profile.photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-xl flex items-center justify-center text-blue-600 font-bold text-4xl overflow-hidden shrink-0">
                {profile.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white p-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          </div>
          
          <div className="text-center space-y-1.5 w-full px-4">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight truncate">@{profile.nickname}</h1>
            {profile.bio && (
              <p className="text-[15px] text-gray-600 font-medium leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </section>

        {/* Links Section */}
        <section className="w-full flex-grow space-y-3.5 px-2">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.url)}
              className="w-full group bg-white border-2 border-gray-100 hover:border-gray-900 shadow-sm hover:shadow-xl p-4 rounded-2xl flex items-center transition-all duration-300 relative overflow-hidden active:scale-[0.98] transform"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 shadow-sm group-hover:scale-110 group-hover:bg-gray-100 transition-all duration-300 z-10">
                <img 
                  src={`https://s2.googleusercontent.com/s2/favicons?domain=${link.url}`} 
                  alt="favicon" 
                  className="w-6 h-6"
                />
              </div>
              <div className="flex-grow text-center pr-12 font-bold text-gray-800 text-lg truncate tracking-tight z-10 transition-colors">
                {link.title}
              </div>
            </button>
          ))}
          {links.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
               <p className="text-gray-400 font-medium text-sm">No links added yet.</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="pt-10 pb-4 text-center mt-auto">
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-full text-xs text-gray-400 font-black tracking-widest shadow-inner">
            ⚡ POWERED BY MYLINK
          </div>
        </footer>
      </div>
    </div>
  );
}
