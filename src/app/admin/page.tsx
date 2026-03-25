"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile, getUserLinks, addLink, updateLink, deleteLink, UserProfile, LinkItem } from "@/lib/db";
import { InlineEdit } from "@/components/ui/InlineEdit";
import { SignOut, Plus, Trash } from "@phosphor-icons/react";
import Link from "next/link";

export default function AdminPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    const p = await getUserProfile(user.uid);
    setProfile(p);
    const l = await getUserLinks(user.uid);
    setLinks(l);
  };

  const handleUpdateProfile = async (field: keyof UserProfile, value: string) => {
    if (!user || !profile) return;
    const newData = { [field]: value };
    setProfile({ ...profile, ...newData });
    await updateUserProfile(user.uid, newData);
  };

  const handleAddLink = async () => {
    if (!user || !newUrl || !newTitle) return;
    let finalUrl = newUrl;
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }
    await addLink(user.uid, finalUrl, newTitle);
    setNewUrl("");
    setNewTitle("");
    loadData();
  };

  const handleUpdateLink = async (linkId: string, field: keyof LinkItem, value: string) => {
    if (!user) return;
    let finalValue = value;
    if (field === "url" && !/^https?:\/\//i.test(finalValue)) {
      finalValue = 'https://' + finalValue;
    }
    await updateLink(user.uid, linkId, { [field]: finalValue });
    loadData();
  };

  const handleDeleteLink = async (linkId: string) => {
    if (!user) return;
    if (confirm("Are you sure you want to delete this link?")) {
      await deleteLink(user.uid, linkId);
      loadData();
    }
  };

  if (loading || !profile) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto w-full p-6 space-y-8 bg-white min-h-screen border-x border-gray-100 shadow-sm relative pt-16 pb-20">
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-gray-100 z-10 sticky top-0">
        <h1 className="font-extrabold text-xl tracking-tight text-gray-900">Admin</h1>
        <div className="flex gap-4 items-center">
          <Link href={`/${profile.nickname}`} target="_blank" className="px-3 py-1.5 bg-black text-white rounded-full text-xs font-semibold hover:bg-gray-800 transition">
            View Public
          </Link>
          <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Logout">
            <SignOut className="w-5 h-5" />
          </button>
        </div>
      </header>
      
      {/* Profile Section */}
      <section className="flex flex-col items-center space-y-4 pt-4">
        {profile.photoURL ? (
          <img src={profile.photoURL} alt="Profile" className="rounded-full w-24 h-24 object-cover border-4 border-gray-50 shadow-sm" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-blue-50 flex items-center justify-center text-blue-600 font-bold text-3xl shadow-sm">
            {profile.displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="w-full space-y-2 !mt-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Nickname</label>
          <InlineEdit 
            value={profile.nickname} 
            onSave={(v) => handleUpdateProfile("nickname", v)} 
            className="text-lg font-bold text-gray-900"
          />
          <div className="pt-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Bio</label>
            <InlineEdit 
              value={profile.bio} 
              onSave={(v) => handleUpdateProfile("bio", v)} 
              as="textarea"
              className="text-sm text-gray-700 w-full"
            />
          </div>
        </div>
      </section>

      {/* Add Link Section */}
      <section className="bg-gray-50 p-5 rounded-2xl border border-gray-200/60 shadow-inner space-y-4">
        <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <Plus className="w-3 h-3"/> Add New Link
        </h2>
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Title (e.g., GitHub Portfolio)" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
          />
          <input 
            type="url" 
            placeholder="URL (e.g., github.com/...)" 
            value={newUrl} 
            onChange={(e) => setNewUrl(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
            onKeyDown={(e) => e.key === "Enter" && handleAddLink()}
          />
          <button 
            onClick={handleAddLink}
            disabled={!newTitle || !newUrl}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold tracking-wide hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-sm flex items-center justify-center"
          >
            Add Link
          </button>
        </div>
      </section>

      {/* Link List Section */}
      <section className="space-y-4">
        <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest flex justify-between items-center border-b border-gray-100 pb-2">
          <span>Active Links</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px]">{links.length}</span>
        </h2>
        
        {links.length === 0 ? (
          <div className="text-center py-10 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm font-medium">No links added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {links.map(link => (
              <div key={link.id} className="group flex items-center bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all relative">
                
                {/* Favicon */}
                <div className="mr-4 flex-shrink-0 bg-gray-50 p-2 rounded-xl border border-gray-100">
                  <img 
                    src={`https://s2.googleusercontent.com/s2/favicons?domain=${link.url}`} 
                    alt="favicon" 
                    className="w-5 h-5 rounded-sm opacity-90"
                  />
                </div>
                
                <div className="flex-grow space-y-1 overflow-hidden pr-10">
                  <InlineEdit 
                    value={link.title} 
                    onSave={(v) => handleUpdateLink(link.id, "title", v)} 
                    className="font-bold text-gray-900 text-base w-full truncate"
                  />
                  <InlineEdit 
                    value={link.url} 
                    onSave={(v) => handleUpdateLink(link.id, "url", v)} 
                    className="text-xs text-gray-500 font-medium w-full truncate"
                    showIcon={false}
                  />
                  {/* Click Stats */}
                  <div className="text-[10px] text-gray-400 font-mono mt-1 w-full truncate flex items-center gap-1 font-bold pt-1">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    {link.clicks || 0} CLICKS
                  </div>
                </div>

                <button 
                  onClick={() => handleDeleteLink(link.id)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl opacity-0 xl:opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete Link"
                >
                  <Trash className="w-4 h-4" weight="bold" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
