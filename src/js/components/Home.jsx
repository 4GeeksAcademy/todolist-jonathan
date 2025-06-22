import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [todos, setTodos] = useState ([])

//Funcion para coger las tareas del usuario
	function getTodos() {
		fetch('https://playground.4geeks.com/todo/users/jonathanfd',{method:"GET"})
		.then((response)=>{
			return response.json()}) 
		.then((data)=>setTodos(data))
		.catch((error)=>console.log(error)) 
	}

	
//Funcion para hacer lo mismo que window.onload
	useEffect(()=>{
		getTodos()
	},[])

// Añadir una tarea
	function addTask(event) {
		if (event.key === "Enter") {
			setTasks(tasks.concat(newTask));
			setNewTask("");
		}
	}

// Borrar una tarea
	function deleteTask(index) {
		setTasks(tasks.filter((_, i) => i !== index));
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
					<li key={index}>{task}<span onClick={() => deleteTask(index)}><i class="fa-regular fa-trash-can"></i></span>
					</li>
				))}
			</ul>
			<div id="pendiente">
				{tasks.length} tareas pendientes
			</div>
		</div>
	);
};
export default Home;