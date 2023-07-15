import { useContext } from "react";
import { TasksContext } from "../lib/contexts/TasksContext";

export const Button = ({ id }) => {
	const { removeTask } = useContext(TasksContext);

	return (
		<button
			onClick={() => removeTask(id)}
			className="bg-red-500 p-2 mx-2 rounded-full"
		>
			X
		</button>
	);
};
