import { BadgeAlert, BookOpen, CircleQuestionMark, Code, Database, Home, Menu, Scale, Search } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {

	return (
		<>
			<header className="sticky top-0 z-20 border-b border-purple-900/40 bg-black">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
					<div className="flex items-center gap-3">
						<details className="group relative">
							<summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-purple-300 transition-all duration-300 hover:scale-105 hover:bg-purple-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/60">
								<Menu className="text-xl" />
							</summary>
							<div className="absolute left-0 mt-3 w-56 rounded-2xl border border-purple-900/40 bg-[#0f0f14] p-2 shadow-xl shadow-purple-900/30">
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="https://github.com/is-it-healthy/docs/blob/main/help.md" target="_blank" rel="noreferrer">
									<CircleQuestionMark className="text-lg" />Help & Support
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="https://github.com/is-it-healthy/docs/blob/main/how.md" target="_blank" rel="noreferrer">
									<BadgeAlert className="text-lg" />How it works?
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="https://github.com/is-it-healthy/docs/blob/main/license.md" target="_blank" rel="noreferrer">
									<BookOpen className="text-lg" />License
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="https://github.com/is-it-healthy/docs/blob/main/legal.md" target="_blank" rel="noreferrer">
									<Scale className="text-lg" />Legal
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="https://github.com/is-it-healthy/docs/blob/main/contribute-code.md" target="_blank" rel="noreferrer">
									<Code className="text-lg" />Contribute Code
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="https://github.com/is-it-healthy/docs/blob/main/contribute-data.md" target="_blank" rel="noreferrer">
									<Database className="text-lg" />Contribute Data
								</a>
							</div>
						</details>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-lg font-semibold text-slate-100">is it healthy?</span>
					</div>
					<div className="flex items-center gap-2">
						<Link className="flex h-10 w-10 items-center justify-center rounded-full text-purple-300 transition-all duration-300 hover:scale-105 hover:bg-purple-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/60" to="/">
							<Home className="text-xl" />
						</Link>
						<Link className="flex h-10 w-10 items-center justify-center rounded-full text-purple-300 transition-all duration-300 hover:scale-105 hover:bg-purple-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/60" to="/app">
							<Search className="text-xl" />
						</Link>
					</div>
				</div>
			</header>
		</>
	);
};

export { Header }
