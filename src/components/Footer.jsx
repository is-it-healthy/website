import { Github, BrowserChrome } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-purple-100 bg-white/80 py-6 backdrop-blur">
      <div className="mx-4 lg:mx-8 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-purple-100 p-2 text-purple-700 shadow-sm transition hover:border-purple-200 hover:bg-purple-50"
          >
            <BrowserChrome className="text-2xl" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-purple-100 p-2 text-purple-700 shadow-sm transition hover:border-purple-200 hover:bg-purple-50"
          >
            <Github className="text-2xl" />
          </a>
        </div>
        <span className="text-sm text-slate-600">
          2022 - {new Date().getFullYear()}{" "}
          <span className="font-semibold text-slate-800">&copy; Hirusha Adikari</span>
        </span>
      </div>
    </footer>
  );
};

export { Footer };
