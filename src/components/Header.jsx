import { List, ExclamationTriangle, QuestionCircle, People, FileEarmarkArrowUp, CodeSlash, Journals, Book } from "react-bootstrap-icons";
const Header = () => {

	return (
		<>
			<div className="navbar sticky top-0 z-20 border-b border-purple-900/40 bg-black">
				<div className="navbar-start">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle text-purple-300 hover:bg-purple-900/30"
						>
							<List className="text-xl" />
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content rounded-box z-10 mt-3 w-56 border border-purple-900/40 bg-[#0f0f14] p-2 shadow-lg shadow-purple-900/30">
							<li><a className="hover:bg-purple-900/30"><QuestionCircle className="text-lg" />Help & Support</a></li>
							<li><a className="hover:bg-purple-900/30"><ExclamationTriangle className="text-lg" />How it works?</a></li>
							<li><a className="hover:bg-purple-900/30"><Book className="text-lg" />License</a></li>
							<li><a className="hover:bg-purple-900/30"><Journals className="text-lg" />Open Source Licenses</a></li>
							<li><a className="hover:bg-purple-900/30"><CodeSlash className="text-lg" />Contribute Code</a></li>
							<li><a className="hover:bg-purple-900/30"><FileEarmarkArrowUp className="text-lg" />Contribute Data</a></li>
							<li><a className="hover:bg-purple-900/30"><People className="text-lg" /> Contributors</a></li>
						</ul>
					</div>
				</div>
				<div className="navbar-center">
					<a className="btn btn-ghost text-xl font-semibold text-slate-100">
						is it healthy?
					</a>
				</div>
				<div className="navbar-end">
					<button className="btn btn-ghost btn-circle text-purple-300 hover:bg-purple-900/30">
						<QuestionCircle className="text-xl" />
					</button>
					<button className="btn btn-ghost btn-circle text-purple-300 hover:bg-purple-900/30">
						<div className="indicator">
							<ExclamationTriangle className="text-xl" />
						</div>
					</button>
				</div>
			</div>
		</>
	);
};

export { Header }
