import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../lib/contexts/UserContext";

export const Navbar = () => {
	const { user, setUser } = useContext(UserContext);

	const logoutHandler = async () => {
		await fetch("https://lums.live/api/user/logout", {
			method: "POST",
		});

		setUser(null);
	};

	return (
		<nav className="bg-neutral-900 text-white w-full flex items-center justify-between p-5">
			<h1 className="text-2xl font-bold ml-10">
				<Link to={"/"}>Task Manager</Link>
			</h1>
			<div className="flex gap-10 mr-10">
				{user ? (
					<Link
						onClick={logoutHandler}
						className="text-2xl font-bold text-purple-500 hover:scale-105 duration-150 "
					>
						Logout
					</Link>
				) : (
					<>
						<Link
							to={"/login"}
							className="text-2xl font-bold text-purple-500 hover:scale-105 duration-150 "
						>
							Login
						</Link>
						<Link
							to={"/signup"}
							className="text-2xl font-bold text-purple-500 hover:scale-105 duration-150 "
						>
							Signup
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};
