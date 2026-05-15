import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface LinkItem {
  id: string;
  title: string;
  url: string;
}

interface LinkListProps {
  links: LinkItem[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<LinkItem>) => void;
}

export default function LinkList({ links, onDelete, onUpdate }: LinkListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");

  const startEdit = (link: LinkItem) => {
    setEditingId(link.id);
    setEditTitle(link.title);
    setEditUrl(link.url);
  };

  const saveEdit = (id: string) => {
    if (!editTitle.trim() || !editUrl.trim()) return;
    onUpdate(id, { title: editTitle, url: editUrl });
    setEditingId(null);
  };

  const confirmDelete = (id: string) => {
    onDelete(id);
    setDeleteId(null);
  };

  return (
    <div className="space-y-3">
      {links.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-dashed">
          등록된 링크가 없습니다.
        </p>
      ) : (
        links.map((link) => {
          const isEditing = editingId === link.id;

          return (
            <div key={link.id} className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
              {isEditing ? (
                <div className="flex-1 pr-4 space-y-2">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:border-purple-400"
                    placeholder="제목"
                  />
                  <input
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:border-purple-400"
                    placeholder="URL"
                  />
                </div>
              ) : (
                <div className="truncate pr-4 flex-1">
                  <p className="font-medium truncate">{link.title}</p>
                  <a href={link.url} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline truncate block">
                    {link.url}
                  </a>
                </div>
              )}

              <div className="flex items-center space-x-2 flex-shrink-0">
                {isEditing ? (
                  <div className="flex flex-col space-y-2">
                    <Button onClick={() => saveEdit(link.id)} size="sm" variant="outline" className="text-blue-600 bg-white hover:bg-blue-50 border-blue-200">저장</Button>
                    <Button onClick={() => setEditingId(null)} size="sm" variant="ghost" className="text-gray-500">취소</Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={() => startEdit(link)} size="sm" variant="outline" className="text-blue-500 bg-white hover:text-blue-700 hover:bg-blue-50 border-blue-200">수정</Button>
                    <Button onClick={() => setDeleteId(link.id)} size="sm" variant="outline" className="text-red-500 bg-white hover:text-red-700 hover:bg-red-50 border-red-200">삭제</Button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">링크 삭제</h3>
            <p className="text-sm text-gray-500 mb-6">정말 이 링크를 삭제하시겠습니까?<br/>이 작업은 되돌릴 수 없습니다.</p>
            <div className="flex justify-end space-x-3">
              <Button onClick={() => setDeleteId(null)} variant="outline">취소</Button>
              <Button onClick={() => confirmDelete(deleteId)} variant="destructive" className="bg-red-500 hover:bg-red-600 text-white">삭제하기</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
