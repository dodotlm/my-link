import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground font-sans">
      <main className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative w-32 h-32 overflow-hidden rounded-full border-4 border-zinc-200 dark:border-zinc-800">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Honggildongjeon.jpg"
              alt="홍길동"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">홍길동</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
          </p>
        </div>
        
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} 홍길동. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
