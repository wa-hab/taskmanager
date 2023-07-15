import { createContext, useState } from "react";

export const TasksContext = createContext();

// Context provider

export const TasksProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);

	const addTask = async (task) => {
		try {
			const response = await fetch("/api/task/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					content: task,
				}),
			});

			const data = await response.json();
			if (data.success) {
				alert("Task added successfully");
				console.log(data.data.task.id);
				setTasks([
					...tasks,
					{
						id: data.data.task.id,
						content: task,
					},
				]);
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeTask = async (id) => {
		try {
			const response = await fetch("/api/task/delete", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					taskId: id,
				}),
			});

			const data = await response.json();
			if (data.success) {
				alert("Task removed successfully");

				const newTasks = tasks.filter((task) => task.id !== id);
				setTasks(newTasks);
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TasksContext.Provider
			value={{
				tasks,
				addTask,
				removeTask,
				setTasks
			}}
		>
			{children}
		</TasksContext.Provider>
	);
};
