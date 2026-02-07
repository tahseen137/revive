import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-brand-500/10 text-brand-400 mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <path d="M8 11h6" />
          </svg>
        </div>

        <h1 className="text-6xl font-bold tracking-tight mb-4 text-brand-400">
          404
        </h1>

        <h2 className="text-2xl font-semibold mb-4">Page not found</h2>

        <p className="text-zinc-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-xl transition-all"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go home
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white font-medium px-6 py-3 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
          >
            Read our blog
          </Link>
        </div>
      </div>
    </main>
  );
}
