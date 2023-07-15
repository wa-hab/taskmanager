import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../lib/contexts/UserContext";

export const Login = () => {
	const [modalText, setModalText] = useState("");
	const { setUser } = useContext(UserContext);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = Object.fromEntries(new FormData(e.target));

		const response = await fetch("/api/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		// set the cookie that the server sends back
		// document.cookie = response.headers.get("sessionCookie");
		// response.headers.get("sessionCookie")

		const data = await response.json();

		if (data.success) {
			setUser(data.user);
		}

		setModalText(data.message);

		setTimeout(() => {
			setModalText("");
			if (data.success) {
				navigate("/");
			}
		}, 2000);
	};

	return (
		<div className="signup w-full bg-neutral-900 flex items-start justify-center text-white min-h-screen">
			{modalText && (
				<dialog
					id="my_modal_5"
					className="modal modal-bottom sm:modal-middle modal-open"
				>
					<form method="dialog" className="modal-box">
						<h3 className="font-bold text-lg">Alert!</h3>
						<p className="py-4">{modalText}</p>
					</form>
				</dialog>
			)}
			<div className="w-1/2 flex flex-col items-center justify-center">
				<h1 className="text-5xl font-bold mb-10 mt-32">Login</h1>
				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					<div className="form-control w-full max-w-xs text-white">
						<label className="label">
							<span className="label-text">Username</span>
						</label>
						<input
							type="text"
							name="username"
							placeholder="Username"
							className="input input-bordered w-full max-w-xs text-white"
						/>
					</div>

					<div className="form-control w-full max-w-xs text-white">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							className="input input-bordered w-full max-w-xs text-white"
						/>
					</div>

					<button className="btn btn-primary mt-4">{"Let's"} go!</button>
				</form>
			</div>
		</div>
	);
};
