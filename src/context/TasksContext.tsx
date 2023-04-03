"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, useEffect, useState, useMemo } from "react";

export const TasksContext = createContext<{
	tasks: Task[];
	createTask: (task: Task) => void;
	deleteTask: (id: string) => void;
	updateTask: (id: string, updatedTask: Task) => void;
}>({
	tasks: [],
	createTask: () => {},
	deleteTask: () => {},
	updateTask: () => {},
});

export const useTasks = (): {
	tasks: Task[];
	createTask: (task: Task) => void;
	deleteTask: (id: string) => void;
	updateTask: (id: string, updatedTask: Task) => void;
} => {
	const context = useContext(TasksContext);
	const { tasks, createTask, deleteTask, updateTask } = context;
	if (!context) throw new Error("useTasks must used within a provider");
	return { tasks, createTask, deleteTask, updateTask };
};

export interface Task {
	id: string;
	title: string;
	description: string;
}

export function TasksProvider({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {

	const initialTasks: Task[] = [];

	//const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const { tasks, setTasks } = useLocalStorage("tasks", initialTasks);
	
	// useEffect(() => {
	// 	const tasksFromLocalStorage: Task[] = JSON.parse(localStorage.getItem("tasks") || "null");
	// 	tasksFromLocalStorage ? setTasks(tasksFromLocalStorage) : setTasks(initialTasks)
	// }, [])
	
	// useEffect(() => {
	//   localStorage.setItem("tasks", JSON.stringify(tasks));
	// }, [tasks])

	
	const createTask = ({ id, title, description }: Task) => {
		setTasks([...tasks, { id, title, description }]);
	};

	const deleteTask = (id: string): void => {
		setTasks([...tasks.filter((task) => task.id !== id)]);
	};

	const updateTask = (id: string, updatedTask: Task): void => {
		setTasks([
			...tasks.map((task) => (task.id === id ? {...updatedTask, id} : task)),
		]);
	};

	return (
		<TasksContext.Provider
			value={{ tasks, createTask, deleteTask, updateTask }}
		>
			{children}
		</TasksContext.Provider>
	);
}
