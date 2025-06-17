import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);

	function addTask(event) {
		if (event.key === "Enter") {
			setTasks(tasks.concat(newTask));
			setNewTask("");
		}
	}

	return (
		<div className="text-center">
			<h1>Mis Tareas</h1>
			<ul>
				<li>
					<input
						type="text"
						value={newTask}
						onChange={(event) => setNewTask(event.target.value)}
						onKeyDown={addTask}
						placeholder="¿Qué tengo que hacer?"
					/>
				</li>
				{tasks.map((task, index) => (
					<li key={index}>{task}</li>
				))}
			</ul>
			<div id="pendiente">
				{tasks.length} tareas pendientes
			</div>
		</div>
	);
};
export default Home;