import { List, ExclamationTriangle, QuestionCircle, People, FileEarmarkArrowUp, CodeSlash, Journals, Book } from "react-bootstrap-icons";
const Header = () => {

	return (
		<>
			<div className="navbar sticky top-0 z-20 border-b border-purple-100 bg-white/80 backdrop-blur">
				<div className="navbar-start">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle text-purple-700 hover:bg-purple-50"
						>
							<List className="text-xl" />
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content rounded-box z-10 mt-3 w-56 border border-purple-100 bg-white p-2 shadow-lg shadow-purple-100/60">
							<li><a className="hover:bg-purple-50"><QuestionCircle className="text-lg" />Help & Support</a></li>
							<li><a className="hover:bg-purple-50"><ExclamationTriangle className="text-lg" />How it works?</a></li>
							<li><a className="hover:bg-purple-50"><Book className="text-lg" />License</a></li>
							<li><a className="hover:bg-purple-50"><Journals className="text-lg" />Open Source Licenses</a></li>
							<li><a className="hover:bg-purple-50"><CodeSlash className="text-lg" />Contribute Code</a></li>
							<li><a className="hover:bg-purple-50"><FileEarmarkArrowUp className="text-lg" />Contribute Data</a></li>
							<li><a className="hover:bg-purple-50"><People className="text-lg" /> Contributors</a></li>
						</ul>
					</div>
				</div>
				<div className="navbar-center">
					<a className="btn btn-ghost text-xl font-semibold text-slate-900">
						is it healthy?
					</a>
				</div>
				<div className="navbar-end">
					<button className="btn btn-ghost btn-circle text-purple-700 hover:bg-purple-50">
						<QuestionCircle className="text-xl" />
					</button>
					<button className="btn btn-ghost btn-circle text-purple-700 hover:bg-purple-50">
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
