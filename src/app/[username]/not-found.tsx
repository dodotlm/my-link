import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <h2 className="text-xl font-semibold text-gray-700">페이지를 찾을 수 없습니다.</h2>
        <p className="text-gray-500">
          존재하지 않는 페이지이거나, 잘못된 주소입니다.<br/>
          주소를 다시 확인해주세요.
        </p>
      </div>
      <Link href="/">
        <Button className="bg-[#d8b4e2] hover:bg-[#c99ad6] text-black">
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
