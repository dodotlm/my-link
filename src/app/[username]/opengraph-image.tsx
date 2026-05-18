import { ImageResponse } from "next/og";
import { getUserByNickname } from "@/lib/db";

export const runtime = "edge";

export const alt = "MyLink Profile";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  const userProfile = await getUserByNickname(username);
  
  if (!userProfile) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
          <h1 style={{ fontSize: '60px', color: '#374151' }}>프로필을 찾을 수 없습니다</h1>
        </div>
      )
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage: "linear-gradient(to bottom right, #f3e8ff, #ffffff)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            textAlign: "center",
          }}
        >
          {userProfile.photoURL ? (
            <img
              src={userProfile.photoURL}
              alt="Profile"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "100px",
                border: "8px solid white",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                marginBottom: "40px",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: "200px",
                borderRadius: "100px",
                border: "8px solid white",
                backgroundColor: "#d8b4e2",
                color: "white",
                fontSize: "80px",
                fontWeight: "bold",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                marginBottom: "40px",
              }}
            >
              {userProfile.displayName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <h1
            style={{
              fontSize: "70px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            {userProfile.displayName}
          </h1>

          <p
            style={{
              fontSize: "40px",
              color: "#6b7280",
              maxWidth: "800px",
              textAlign: "center",
              lineHeight: 1.4,
              overflow: "hidden",
            }}
          >
            {userProfile.bio || `${userProfile.displayName}님의 MyLink 페이지입니다.`}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
