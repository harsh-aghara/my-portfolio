# harsh-portfolio   ¯\\_(ツ)_/¯

*Really, you need a README for a portfolio repo too??* I mean, it's a portfolio. You click the link, you look at the site, you hire me. Simple.

But fine, since the AI and the recruiters demand it, here you go... 

**Live →** [harsh-aghara-portfolio.vercel.app](https://harsh-aghara-portfolio.vercel.app)

## What is this?
It's the code behind the site where I talk about my code. 
Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4 because I enjoy fast sites and occasional breaking changes.

## Getting Started
If for some unfathomable reason you want to run my portfolio locally and pretend to be me:

```bash
git clone https://github.com/harsh-aghara/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and bask in the console logs.

## Known Issues (aka "It's not a bug, it's a feature")
- **`npm audit` is yelling about PostCSS vulnerabilities** via Next.js 15's internally bundled `postcss@8.4.31`. It's a Next.js internal dependency problem. The fix requires Next 16, which would break things. So, we peacefully ignore it. (The project's actual PostCSS via Tailwind is fully patched).

## License
[MIT](LICENSE) - Do whatever you want with it, just don't steal my face.
