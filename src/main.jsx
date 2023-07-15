import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Login } from "./pages/Login.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { ProtectedLayout } from "./layouts/ProtectedLayout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TasksProvider } from "./lib/contexts/TasksContext.jsx";
import { UserProvider } from "./lib/contexts/UserContext.jsx";
import "./index.css";
import { Signup } from "./pages/Signup.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<UserProvider>
		<TasksProvider>
			<BrowserRouter>
				<Navbar></Navbar>
				<Routes>
					<Route element={<ProtectedLayout />}>
						<Route path="/" element={<App />} />
					</Route>

					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</TasksProvider>
	</UserProvider>
);
