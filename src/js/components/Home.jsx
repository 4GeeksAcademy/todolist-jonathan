import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);
	/* const [todos, setTodos] = useState([]) */
	const [user, setUser] = useState("");


	//Funcion para crear un usuario
	function createUser() {
		fetch('https://playground.4geeks.com/todo/users/pepitolio', { method: "POST" })
			.then((response) => {
				return response.json()
			})
			.then((data) => setUser(data))
			.catch((error) => console.log(error))
	}

	//Funcion para coger las tareas del usuario
	function getTodos() {
		fetch('https://playground.4geeks.com/todo/users/pepitolio', { method: "GET" })
			.then((response) => {
				if (!response.ok) {
					createUser();

				} else {

					return response.json()
				}


			})
			.then((data) => {
				console.log(data.todos);

				setTasks(data.todos)
			})
			.catch((error) => console.log(error))
	}


	//Funcion para hacer lo mismo que window.onload
	useEffect(() => {
		getTodos()
	}, [])

	//Funcion para crear nuevas tareas
	function createTask(newTask) {
		let task = newTask

		fetch('https://playground.4geeks.com/todo/todos/pepitolio', {
			method: "POST",
			body: JSON.stringify({
				"label": task,
				"is_done": false
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				console.log(response);
				if (response.status === 201) {
					getTodos()
				}

				return response.json()
			})
			.then((data) => console.log(data))
			.catch((error) => console.log(error))

	}



	//Funcion para borrar una tarea
	 function deleteTask(id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, { method: "DELETE" })
			.then((response) => {
				if (response.ok) {
					getTodos();
				}
				return response.json()
			})
			.then((data) => setTodos(data))
			.catch((error) => console.log(error))
	} 





	// Añadir una tarea
	function addTask(event) {
		if (event.key === "Enter") {
			createTask(newTask);
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



					<li key={index}>{task.label}<span onClick={() => deleteTask(index)}><i className="fa-regular fa-trash-can"></i></span>
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