"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LinkList, { LinkItem } from "@/components/LinkList";
import { useAuth } from "@/components/AuthProvider";
import { addLink, getUserLinks, deleteLink } from "@/lib/db";

export default function MyPage() {
  const { user } = useAuth();
  const uid = user?.uid || "test-user-uid"; // Fallback for test mode

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Read: Fetch links from Firestore on mount
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const fetchedLinks = await getUserLinks(uid);
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
  }, [uid]);

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
      await addLink(uid, url, title);
      
      // Re-fetch list to get the generated ID and updated list
      const updatedLinks = await getUserLinks(uid);
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
      await deleteLink(uid, id);
      setLinks(links.filter((link) => link.id !== id));
    } catch (error) {
      console.error("Failed to delete link:", error);
      alert("링크 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      {/* 상단: 제목 */}
      <section>
        <h1 className="text-2xl font-bold">새 링크 추가</h1>
      </section>

      {/* 중간: 폼 */}
      <section>
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
          <LinkList links={links} onDelete={handleDelete} />
        )}
      </section>
    </div>
  );
}
