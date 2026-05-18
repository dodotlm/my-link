"use client";

import { LinkItem } from "@/lib/db";
import { incrementLinkClick } from "@/lib/db";

interface PublicLinkProps {
  link: LinkItem;
  userId: string;
}

export default function PublicLink({ link, userId }: PublicLinkProps) {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // We don't prevent default, so the link will open naturally in a new tab
    // We just fire off the increment function in the background
    try {
      await incrementLinkClick(userId, link.id);
    } catch (error) {
      console.error("Failed to increment click:", error);
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block w-full p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-center font-medium text-gray-800"
    >
      {link.title}
    </a>
  );
}
