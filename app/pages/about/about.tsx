export default function AboutPage() {
  return (
    <div className="mx-3 flex flex-col rounded-2xl bg-[var(--card-color)] px-10 py-5 lg:mx-0 lg:p-10">
      <div className="flex flex-col items-center py-10 text-[var(--text-color)]">
        <p className="text-xl font-bold">🚧 뚝딱뚝딱 공사중입니다 🚧</p>
        <div className="mt-6 flex items-center justify-center">
          <span className="mr-2 animate-bounce text-4xl">👷</span>
          <span className="animate-pulse text-4xl">🔨</span>
          <span className="ml-2 animate-bounce text-4xl delay-150">🔧</span>
        </div>
        <p className="mt-4 text-sm">곧 멋진 내용으로 돌아오겠습니다!</p>
      </div>
    </div>
  );
}
