import { Github, BrowserChrome } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="py-3 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BrowserChrome className="text-2xl" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="text-2xl" />
          </a>
        </div>
        <span className="text-sm">2022 - {new Date().getFullYear()} &copy; Hirusha Adikari</span>
      </div>
    </footer>
  );
};

export { Footer };
