import { Navbar } from "./_components/Navbar"

function App() {
	return (
		<>
			<Navbar />
			<div className="m-6">
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<div className="bg-gray-200 p-4 rounded-lg">
						Content 1
					</div>
					<div className="bg-gray-200 p-4 rounded-lg">
						Content 2
					</div>
					<div className="bg-gray-200 p-4 rounded-lg">
						Content 3
					</div>
					<div className="bg-gray-200 p-4 rounded-lg">
						Content 4
					</div>
					<div className="bg-gray-200 p-4 rounded-lg">
						Content 5
					</div>
				</div>
			</div>
		</>
	)
}

export { App }
