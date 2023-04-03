"use client";
import { useTasks } from "@/context/TasksContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
	const router = useRouter();
	const { tasks } = useTasks();

	return (
		<header className="flex justify-between items-center bg-gray-800 px-28 py-3">
			<Link href="/" className="flex gap-3 items-center">
				<h1 className="font-bold text-3xl text-white">Task App</h1>
				<span className="text-[20px] font-bold text-slate-600">{tasks.length} Tasks</span>
			</Link>
			<div>
				<button
					className="
						bg-green-500 
						hover:bg-green-400 
						transition-all 
						px-5 
						py-2 
						text-gray-50 
						font-bold 
						rounded-sm 
						inline-flex 
						items-center
					"
					onClick={() => router.push("/new")}
				>
					Add task
				</button>
			</div>
		</header>
	);
};

export default Navbar;
