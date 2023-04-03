"use client";
import { Task, useTasks } from "@/context/TasksContext";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-hot-toast';

interface MyComponentProps {
	params: { id: string };
}


const Page: React.FC<MyComponentProps> = ({ params }): JSX.Element => {
	
	const { register, handleSubmit, formState: { errors }, setValue } = useForm<Task>();

	const { tasks, createTask, updateTask } = useTasks();
	const router = useRouter();

	const onSubmit: SubmitHandler<Task> = (data: Task) => {
		if(params.id){
			console.log("first")
			updateTask(params.id, data);
			toast.success("Task updated successfully");
		} else {
			createTask({ ...data, id: uuid() });
			toast.success("Task created successfully");
		}
		router.push("/");
	}

	useEffect(() => {
		if (params.id) {
			const taskFound = tasks.find((task) => task.id == params.id);

			if (taskFound) {
				setValue("title", taskFound.title)
				setValue("description", taskFound.description)
			}
		}
	}, []);

	return (
		<div className="flex justify-center items-center h-full">
			<form onSubmit={handleSubmit(onSubmit)} className="bg-gray-700 p-10">
				<h2 className="text-gray-400 text-[23px] mb-3">New Task</h2>
				<input
					className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full text-white"
					placeholder="Write a title"
					{...register("title", { required: true })}
				/>
				{ errors.title && <span className="bg-red-400 text-white w-full rounded-[5px] block mb-3 p-2">This field is required</span> }
				<textarea
					className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full text-white"
					placeholder="Write a description"
					{...register("description", { required: true })}
				/>
				{ errors.description && <span className="bg-red-400 text-white w-full rounded-[5px] block mb-3 p-2">This field is required</span> }
				<input className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30 cursor-pointer text-white" type="submit" value="Save" />
			</form>
		</div>
	);
};

export default Page;
