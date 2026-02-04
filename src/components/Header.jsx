import { List, ExclamationTriangle, QuestionCircle, People, FileEarmarkArrowUp, CodeSlash, Journals, Book } from "react-bootstrap-icons";
const Header = () => {

	return (
		<>
			<header className="sticky top-0 z-20 border-b border-purple-900/40 bg-black">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
					<div className="flex items-center gap-3">
						<details className="group relative">
							<summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-purple-300 transition hover:bg-purple-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/60">
								<List className="text-xl" />
							</summary>
							<div className="absolute left-0 mt-3 w-56 rounded-2xl border border-purple-900/40 bg-[#0f0f14] p-2 shadow-xl shadow-purple-900/30">
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="#">
									<QuestionCircle className="text-lg" />Help & Support
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="#">
									<ExclamationTriangle className="text-lg" />How it works?
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="#">
									<Book className="text-lg" />License
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="#">
									<Journals className="text-lg" />Open Source Licenses
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="#">
									<CodeSlash className="text-lg" />Contribute Code
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="#">
									<FileEarmarkArrowUp className="text-lg" />Contribute Data
								</a>
								<a className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-purple-900/30" href="#">
									<People className="text-lg" />Contributors
								</a>
							</div>
						</details>
					</div>
					<div className="flex items-center gap-2">
						<span className="hidden h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 text-xs font-semibold text-white shadow-lg shadow-purple-900/40 lg:flex">
							IH
						</span>
						<span className="text-lg font-semibold text-slate-100">is it healthy?</span>
					</div>
					<div className="flex items-center gap-2">
						<button className="flex h-10 w-10 items-center justify-center rounded-full text-purple-300 transition hover:bg-purple-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/60">
							<QuestionCircle className="text-xl" />
						</button>
						<button className="flex h-10 w-10 items-center justify-center rounded-full text-purple-300 transition hover:bg-purple-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/60">
							<ExclamationTriangle className="text-xl" />
						</button>
					</div>
				</div>
			</header>
		</>
	);
};

export { Header }
