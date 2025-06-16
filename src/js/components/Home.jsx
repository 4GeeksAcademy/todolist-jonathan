import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [taskCount, setTaskCount] = useState(0);
	
    function addTask(event) {
		if (event.key === "Enter"){
		let newArray = tasks.concat(newTask)	
		}
	}
	
	return (
		<div className="text-center">

		    <h1>Mis Tareas</h1>
			<ul>
			<li><input type="text" placeholder="¿Qué tengo que hacer?" onChange = { (event) => setNewTask(event.target.value)} onKeyDown={addTask}></input></li>
			<li>Buenas tardes</li>
			<li>Buenos dias</li>
			<li>Buena noches</li>
			</ul>

		
		</div>
	);
};

export default Home;