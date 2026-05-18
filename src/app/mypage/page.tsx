"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LinkList, { LinkItem } from "@/components/LinkList";
import ProfileForm from "@/components/ProfileForm";
import { useAuth } from "@/components/AuthProvider";
import { addLink, getUserLinks, deleteLink, updateLink } from "@/lib/db";

export default function MyPage() {
  const { user, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Read: Fetch links from Firestore on mount
  useEffect(() => {
    const fetchLinks = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const fetchedLinks = await getUserLinks(user.uid);
        // Explicitly map fetchedLinks to match LinkItem properties exactly if needed, 
        // though our schema aligns well already.
        setLinks(fetchedLinks);
      } catch (error) {
        console.error("Failed to fetch links:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLinks();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }
    if (!url.trim()) {
      alert("주소를 입력해주세요");
      return;
    }
    try {
      new URL(url);
    } catch {
      alert("올바른 주소를 입력해주세요");
      return;
    }

    try {
      // Create: Save link to Firestore
      await addLink(user!.uid, url, title);
      
      // Re-fetch list to get the generated ID and updated list
      const updatedLinks = await getUserLinks(user!.uid);
      setLinks(updatedLinks);
      
      setTitle("");
      setUrl("");
    } catch (error) {
      console.error("Failed to add link:", error);
      alert("링크 추가에 실패했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLink(user!.uid, id);
      setLinks(links.filter((link) => link.id !== id));
    } catch (error) {
      console.error("Failed to delete link:", error);
      alert("링크 삭제에 실패했습니다.");
    }
  };

  const handleUpdate = async (id: string, data: Partial<LinkItem>) => {
    try {
      await updateLink(user!.uid, id, data);
      setLinks(links.map(link => link.id === id ? { ...link, ...data } : link));
    } catch (error) {
      console.error("Failed to update link:", error);
      alert("링크 수정에 실패했습니다.");
    }
  };

  if (authLoading) return <div className="p-10 text-center text-gray-500">인증 정보 확인 중...</div>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-10 mt-10 text-center bg-gray-50 rounded-lg shadow-sm border border-dashed">
        <h2 className="text-xl font-bold text-gray-800 mb-4">로그인이 필요합니다</h2>
        <p className="text-sm text-gray-600 mb-6">내 전용 링크를 관리하려면 우측 상단의<br/>Google 로그인 버튼을 클릭하세요.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      {/* 통계 섹션 */}
      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-around text-center">
        <div>
          <p className="text-sm text-gray-500 font-medium">전체 링크</p>
          <p className="text-3xl font-bold text-gray-800">{links.length}</p>
        </div>
        <div className="w-px bg-gray-200"></div>
        <div>
          <p className="text-sm text-gray-500 font-medium">총 클릭 수</p>
          <p className="text-3xl font-bold text-purple-600">
            {links.reduce((acc, link) => acc + (link.clicks || 0), 0)}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">프로필 관리</h2>
        <ProfileForm />
      </section>

      {/* 중간: 폼 */}
      <section>
        <h2 className="text-xl font-bold mb-4">새 링크 추가</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="space-y-2 flex flex-col">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="링크 제목을 입력하세요"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="url" className="text-sm font-medium text-gray-700">
              주소
            </label>
            <input
              id="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#d8b4e2] hover:bg-[#c99ad6] text-black font-medium"
          >
            추가
          </Button>
        </form>
      </section>

      {/* 하단: 목록 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">등록된 링크 목록</h2>
        {loading ? (
          <p className="text-sm text-gray-500 text-center py-4">로딩 중...</p>
        ) : (
          <LinkList links={links} onDelete={handleDelete} onUpdate={handleUpdate} />
        )}
      </section>
    </div>
  );
}
