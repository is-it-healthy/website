import { List, ExclamationTriangle, QuestionCircle } from "react-bootstrap-icons";
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
							<li><a>Help & Support</a></li>
							<li><a>How it works?</a></li>
							<li><a>License</a></li>
							<li><a>Open Source Licenses</a></li>
							<li><a>Contribute Code</a></li>
							<li><a>Contribute Data</a></li>
							<li><a>Contributors</a></li>
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