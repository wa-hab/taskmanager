import { ListElement } from "./ListElement";
import { TasksContext } from "../lib/contexts/TasksContext";
import { useContext } from "react";

export const TasksList = () => {
	const { tasks } = useContext(TasksContext);

	return (
		<ul className="flex flex-col gap-2 justify-start">
			{tasks?.length !== 0 ? (
				tasks.map((task, index) => {
					return <ListElement key={task.id} index={index} id={task.id} task={task.content} />;
				})
			) : (
				<li className="p-2">No tasks yet!</li>
			)}
		</ul>
	);
};
// props drilling
