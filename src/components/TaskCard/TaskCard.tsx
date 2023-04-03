import { Task, useTasks } from "@/context/TasksContext";
import React, { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface MyComponentsProps {
	task: Task;
}

const TaskCard: React.FC<MyComponentsProps> = ({ task }): JSX.Element => {
	const router = useRouter();
	const { deleteTask } = useTasks();

	const handleDelete = (e: MouseEvent<HTMLButtonElement>): void => {
		deleteTask(task.id);
		e.stopPropagation();
		toast.success("Task deleted successfully");
	};

	return (
		<div
			className="bg-[#3e4f6b] hover:bg-[#556f9b] cursor-pointer px-20 py-5 m-2"
			key={task.id}
			onClick={() => router.push(`/edit/${task.id}`)}
		>
			<div className="flex justify-between">
				<h1 className="text-white">{task.title}</h1>
				<button
					className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center"
					onClick={handleDelete}
				>
					Delete
				</button>
			</div>
			<p className="text-gray-400">{task.description}</p>
			<span className="text-gray-500 text-xs">{task.id}</span>
		</div>
	);
};

export default TaskCard;
