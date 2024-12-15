export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-8 text-4xl font-bold">안녕하세요! 👋</h1>
        <p className="mb-4 text-xl">
          Kurtyoon의 개발 블로그에 오신 것을 환영합니다.
        </p>
        <p className="text-lg text-gray-600">
          이곳에서 개발 여정과 경험을 공유하고 있습니다.
        </p>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300">
          <h2 className="mb-3 text-2xl font-semibold">최근 포스트</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            곧 새로운 글이 업데이트될 예정입니다.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300">
          <h2 className="mb-3 text-2xl font-semibold">프로젝트</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            진행 중인 프로젝트들을 확인해보세요.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300">
          <h2 className="mb-3 text-2xl font-semibold">소개</h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            개발자 Kurtyoon에 대해 알아보세요.
          </p>
        </div>
      </div>
    </main>
  );
}
