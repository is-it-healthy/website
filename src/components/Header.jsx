import { List, ExclamationTriangle, QuestionCircle, People, FileEarmarkArrowUp, CodeSlash, Journals, Book } from "react-bootstrap-icons";
const Header = () => {

	return (
		<>
			<div className="navbar bg-base-100">
				<div className="navbar-start">
					<div className="dropdown">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
							<List className="text-xl" />
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
							<li><a><QuestionCircle className="text-lg" />Help & Support</a></li>
							<li><a><ExclamationTriangle className="text-lg" />How it works?</a></li>
							<li><a><Book className="text-lg" />License</a></li>
							<li><a><Journals className="text-lg" />Open Source Licenses</a></li>
							<li><a><CodeSlash className="text-lg" />Contribute Code</a></li>
							<li><a><FileEarmarkArrowUp className="text-lg" />Contribute Data</a></li>
							<li><a><People className="text-lg" /> Contributors</a></li>
						</ul>
					</div>
				</div>
				<div className="navbar-center">
					<a className="btn btn-ghost text-xl">is it healthy?</a>
				</div>
				<div className="navbar-end">
					<button className="btn btn-ghost btn-circle">
						<QuestionCircle className="text-xl" />
					</button>
					<button className="btn btn-ghost btn-circle">
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