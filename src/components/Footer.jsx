import { GithubIcon, Globe, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-0 border-t border-purple-900/40 bg-black py-6">
      <div className="max-w-md mx-auto md:max-w-3xl lg:max-w-5xl">
      <div className="mx-4 lg:mx-8 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="flex gap-4">
          <a
            href="https://github.com/is-it-healthy"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-purple-900/40 p-2 text-purple-300 shadow-sm transition-all duration-300 hover:scale-105 hover:border-purple-700/60 hover:bg-purple-900/30"
          >
            <GithubIcon className="text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/hirusha-adi/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-purple-900/40 p-2 text-purple-300 shadow-sm transition-all duration-300 hover:scale-105 hover:border-purple-700/60 hover:bg-purple-900/30"
          >
            <Linkedin className="text-2xl" />
          </a>
        </div>
        <span className="text-sm text-slate-400">
          2022 - {new Date().getFullYear()}{" "}
          <span className="font-semibold text-slate-200">&copy; <a href="https://informati.cc" target="_blank" rel="noopener noreferrer">Hirusha Adikari</a></span>
        </span>
      </div>
      </div>
    </footer>
  );
};

export { Footer };
