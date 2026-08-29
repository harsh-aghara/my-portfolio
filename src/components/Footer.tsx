import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import PeekingTux from "./PeekingTux";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"] });

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-bg-primary pt-12">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:px-8 lg:px-12">
        <span 
          className={`text-2xl text-text-tertiary -rotate-2 opacity-80 ${caveat.className}`}
        >
          made by harsh aghara · powered by coffee · presented by boredom
        </span>
      </div>

      {/* Giant fallen social logos */}
      <div className="pointer-events-none relative mt-12 w-full h-[150px] md:h-[300px]">
        
        <PeekingTux />

        {/* GitHub */}
        <a
          href="https://github.com/harsh-aghara"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="pointer-events-auto absolute bottom-0 left-[5%] md:left-[12%] z-10 transition-transform duration-300 hover:-translate-y-4"
        >
          <GithubLogo
            size="100%"
            color="#ffffff"
            weight="fill"
            className="h-28 w-28 translate-y-[20%] -rotate-[18deg] opacity-90 transition-opacity hover:opacity-100 md:h-56 md:w-56"
          />
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/harsh-aghara-2aa223323"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="pointer-events-auto absolute bottom-0 left-[22%] md:left-[28%] z-20 transition-transform duration-300 hover:-translate-y-4"
        >
          <LinkedinLogo
            size="100%"
            color="#0077b5"
            weight="fill"
            className="h-32 w-32 translate-y-[35%] rotate-[8deg] opacity-90 transition-opacity hover:opacity-100 md:h-64 md:w-64"
          />
        </a>

        {/* LeetCode */}
        <a
          href="https://leetcode.com/u/h4rsh01"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LeetCode"
          className="pointer-events-auto absolute bottom-0 left-[55%] md:left-[60%] z-30 transition-transform duration-300 hover:-translate-y-4"
        >
          <svg
            viewBox="0 0 24 24"
            fill="#FFA116"
            role="img"
            aria-hidden="true"
            className="h-24 w-24 translate-y-[15%] -rotate-[12deg] opacity-90 transition-opacity hover:opacity-100 md:h-48 md:w-48"
          >
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
          </svg>
        </a>

        {/* Email */}
        <a
          href="mailto:harsh.aghara44@gmail.com"
          aria-label="Email"
          className="pointer-events-auto absolute bottom-0 left-[70%] md:left-[75%] z-40 transition-transform duration-300 hover:-translate-y-4"
        >
          <EnvelopeSimple
            size="100%"
            color="#EA4335"
            weight="fill"
            className="h-36 w-36 translate-y-[45%] rotate-[18deg] opacity-90 transition-opacity hover:opacity-100 md:h-72 md:w-72"
          />
        </a>
        
      </div>
    </footer>
  );
}
