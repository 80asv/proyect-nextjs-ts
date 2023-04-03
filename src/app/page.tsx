"use client";
import TaskCard from "@/components/TaskCard/TaskCard";
import { useTasks, Task } from "@/context/TasksContext";

export default function Home() {
	const { tasks } = useTasks();

	return (
		<div
			className="
				flex
				justify-center
			"
		>
			<div className="w7/12">
				{tasks.map((task) => (
					<TaskCard task={task} key={task.id} />
				))}
			</div>
		</div>
	);
}
