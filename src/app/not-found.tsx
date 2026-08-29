import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[720px] px-6 py-24 sm:px-8 flex flex-col items-center justify-center min-h-[60vh]">
      <span className="font-mono text-[15px] tracking-[0.1em] font-semibold text-accent uppercase">
        [ ERROR 404 ]
      </span>
      <h1 className="mt-6 text-[80px] sm:text-[120px] font-black leading-none tracking-tight text-text-primary">
        404
      </h1>
      <p className="mt-4 text-lg text-text-secondary text-center">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 font-mono text-sm tracking-wide text-accent transition-colors hover:text-accent-hover"
      >
        [ RETURN_HOME ]
      </Link>
    </section>
  );
}
