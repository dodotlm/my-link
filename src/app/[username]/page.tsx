import { notFound } from "next/navigation";
import { getUserByNickname, getUserLinks } from "@/lib/db";
import Image from "next/image";
import PublicLink from "@/components/PublicLink";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;
  
  const userProfile = await getUserByNickname(username);
  
  if (!userProfile) {
    notFound();
  }

  const links = await getUserLinks(userProfile.uid);

  return (
    <div className="max-w-md mx-auto p-6 space-y-8 min-h-screen flex flex-col items-center pt-20">
      {/* Profile Info */}
      <div className="flex flex-col items-center text-center space-y-4">
        {userProfile.photoURL ? (
          <img 
            src={userProfile.photoURL} 
            alt={userProfile.displayName} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-purple-500 shadow-md border-4 border-white">
            {userProfile.displayName?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{userProfile.displayName}</h1>
          <p className="text-gray-500 mt-2 text-sm max-w-sm whitespace-pre-wrap">{userProfile.bio}</p>
        </div>
      </div>

      {/* Links List */}
      <div className="w-full space-y-4 mt-8 flex flex-col gap-3">
        {links.map((link) => (
          <PublicLink key={link.id} link={link} userId={userProfile.uid} />
        ))}
        {links.length === 0 && (
          <p className="text-gray-400 text-center text-sm mt-10">등록된 링크가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
