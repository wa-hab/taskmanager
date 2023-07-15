import { Button } from "./Button";

export const ListElement = ({ index, task, id }) => {
	return (
		<li className="p-2">
			{index + 1}. {task}
			<Button id={id}></Button>
		</li>
	);
};
