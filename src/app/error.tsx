"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-[720px] px-6 py-24 sm:px-8 flex flex-col items-center justify-center min-h-[60vh]">
      <span className="font-mono text-[15px] tracking-[0.1em] font-semibold text-error uppercase">
        [ RUNTIME ERROR ]
      </span>
      <h1 className="mt-6 text-[60px] sm:text-[80px] font-black leading-none tracking-tight text-text-primary">
        Error
      </h1>
      <p className="mt-4 text-lg text-text-secondary text-center">
        Something went wrong.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 font-mono text-sm tracking-wide text-accent transition-colors hover:text-accent-hover cursor-pointer"
      >
        [ TRY_AGAIN ]
      </button>
    </section>
  );
}
