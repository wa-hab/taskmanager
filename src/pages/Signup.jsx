import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const [modalText, setModalText] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = Object.fromEntries(new FormData(e.target));

		const response = await fetch("/api/user/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		const data = await response.json();

		setModalText(data.message);

		setTimeout(() => {
			setModalText("");
			if (data.success) {
				navigate("/login");
			}
		}, 5000);
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
				<h1 className="text-5xl font-bold mb-10 mt-32">Signup</h1>
				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Username</span>
						</label>
						<input
							type="text"
							name="username"
							placeholder="Username"
							className="input input-bordered w-full max-w-xs"
						/>
					</div>

					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							className="input input-bordered w-full max-w-xs"
						/>
					</div>

					<button className="btn btn-primary mt-4">{"Let's"} go!</button>
				</form>
			</div>
		</div>
	);
};
