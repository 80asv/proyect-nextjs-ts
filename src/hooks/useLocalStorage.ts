import { Task } from "@/context/TasksContext";
import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialState: Task[]){
    const [tasks, setTasks] = useState<Task[]>(initialState);

    useEffect(() => {
        const item: Task[] = JSON.parse(localStorage.getItem("tasks") || "null");
		item ? setTasks(item) : setTasks(initialState)
    }, []);

    useEffect(() => {
        if(tasks.length > 0){
            localStorage.setItem(key, JSON.stringify(tasks));
        }
    }, [tasks]);

    return { tasks, setTasks }
}