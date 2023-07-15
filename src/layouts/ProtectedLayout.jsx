import { useContext } from "react";
import { UserContext } from "../lib/contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedLayout = () => {
	const { user } = useContext(UserContext);

	if (user) {
		return <div><Outlet/></div>;
	} else {
		return <Navigate to="/login" />;
	}
};
