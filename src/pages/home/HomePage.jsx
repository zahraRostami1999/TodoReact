import { useState, useEffect } from "react"
import Api from "../../services/Api"
import { Header, InputTasks, TasksList } from "../../components/PageTask/index"

function TodoPage() {
	const [tasks_list, setTasks_list] = useState([])
	const [tasks_should_change, setTasks_should_change] = useState(true)
	console.log(tasks_list);

	const addTask = async (task_index) => {
		Api.Task.create(task_index)
		setTasks_should_change(true)
	}

	useEffect(() => {
		const getTasks = async () => {
			let tasksList = await Api.Task.getAll(1)
			if (!tasksList) return
			setTasks_list(tasksList.content)
			setTasks_should_change(false)
		}
		getTasks()
	}, [tasks_should_change])

	return (
		<>
			<div className='w-full min-h-screen text-neutral-800 bg-gradient-to-br from-purple-50 to-purple-400'>
				<div className='flex flex-col gap-10 h-full p-5'>
					{/* header */}
					<Header />
					{/* input */}
					<div className="sticky top-2 z-10">
						<InputTasks addTask={addTask} />
					</div>
					{/* list */}
					<TasksList
						initialTasks={tasks_list}
						handleChange={() => setTasks_should_change(true)}
					/>
				</div>
			</div>
		</>
	)
}

export default TodoPage
