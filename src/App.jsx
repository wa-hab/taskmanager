import { useContext, useEffect } from "react";
import { TasksContext } from "./lib/contexts/TasksContext";
import { TasksList } from "./components/TasksList";

function App() {
	const { addTask, setTasks } = useContext(TasksContext);

	const getAllTasks = async () => {
		const response = await fetch("/api/task/");
		const data = await response.json();

		if (data.success) {
			setTasks(data.data.tasks);
		}
	};

	useEffect(() => {
		getAllTasks();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = new FormData(event.target);

		const task = data.get("task");

		addTask(task);

		event.target.reset();
	};

	return (
		<div className="bg-neutral-900 text-white min-h-screen w-full flex flex-col items-center justify-start text-4xl font-bold">
			<h1 className="mt-12 text-purple-500">Task Manager</h1>

			<form onSubmit={handleSubmit} className="mt-20 rounded-lg flex gap-10">
				<input
					type="text"
					name="task"
					className="bg-neutral-900 border border-purple-500 rounded-lg"
				/>
				<button
					type="submit"
					className="text-base bg-purple-500 p-2 rounded-full"
				>
					Add Task
				</button>
			</form>

			<div className="mt-10 p-10 text-lg font-normal">
				<TasksList />
			</div>
		</div>
	);
}

export default App;
