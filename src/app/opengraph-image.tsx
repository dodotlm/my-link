import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "MyLink - All your essential links in one place";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#f9fafb",
          backgroundImage: "linear-gradient(to bottom, #faf5ff, #ffffff)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              height: "120px",
              backgroundColor: "#9333ea",
              borderRadius: "30px",
              color: "white",
              fontSize: "80px",
              fontWeight: "bold",
              marginBottom: "40px",
            }}
          >
            M
          </div>
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "900",
              color: "#111827",
              letterSpacing: "-0.05em",
              marginBottom: "20px",
              lineHeight: 1.1,
            }}
          >
            나만의 모든 링크를<br/>
            단 하나의 페이지에.
          </h1>
          <p
            style={{
              fontSize: "40px",
              color: "#4b5563",
              marginTop: "20px",
            }}
          >
            MyLink
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
