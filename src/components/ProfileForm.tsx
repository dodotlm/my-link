"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { getUserProfile, updateUserProfile, UserProfile, getUserByNickname } from "@/lib/db";

export default function ProfileForm() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const data = await getUserProfile(user.uid);
        if (data) {
          setProfile(data);
          setUsername(data.nickname || "");
          setDisplayName(data.displayName || "");
          setBio(data.bio || "");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!username.trim() || !displayName.trim()) {
      alert("username과 표시 이름을 입력해주세요.");
      return;
    }

    // username format validation (alphanumeric and dashes only)
    const validUsernameRegex = /^[a-z0-9\-]+$/;
    if (!validUsernameRegex.test(username)) {
      alert("username은 영문 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.");
      return;
    }

    setSaving(true);
    try {
      // Check if username is already taken by someone else
      if (profile?.nickname !== username) {
        const existingUser = await getUserByNickname(username);
        if (existingUser && existingUser.uid !== user.uid) {
          alert("이미 사용중인 username입니다.");
          setSaving(false);
          return;
        }
      }

      await updateUserProfile(user.uid, {
        nickname: username,
        displayName: displayName,
        bio: bio,
      });
      alert("프로필이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("프로필 저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-sm text-gray-500">프로필 로딩 중...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="space-y-2 flex flex-col">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username (공유 URL)
        </label>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm">{typeof window !== 'undefined' ? window.location.origin : ''}/</span>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            placeholder="username"
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
        <p className="text-xs text-gray-500">영문 소문자, 숫자, 하이픈(-)만 가능</p>
      </div>

      <div className="space-y-2 flex flex-col">
        <label htmlFor="displayName" className="text-sm font-medium text-gray-700">
          표시 이름
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="표시될 이름"
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
      </div>

      <div className="space-y-2 flex flex-col">
        <label htmlFor="bio" className="text-sm font-medium text-gray-700">
          소개글
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="짧은 소개글을 입력하세요"
          rows={3}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
        />
      </div>

      <Button 
        type="submit" 
        disabled={saving}
        className="w-full bg-[#d8b4e2] hover:bg-[#c99ad6] text-black font-medium"
      >
        {saving ? "저장 중..." : "프로필 저장"}
      </Button>
    </form>
  );
}
