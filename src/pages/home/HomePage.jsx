import { useState, useEffect } from "react"
import Api from "../../services/api/api.js"
import { Header, InputTasks, TasksList, LoadingScreen } from "../../components/PageTask/index"
import { useDispatch } from "react-redux";
import { set_tasks, append_tasks, add_task } from "../../redux/TaskSlice";
import Msg from "../../config/messages.js";
import { toast } from "react-toastify";

function TodoPage() {
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const [page, setPage] = useState(1)
	const [total_pages, setTotal_pages] = useState()
	const [loadingMore, setLoadingMore] = useState(false);
	const dispatch = useDispatch();

	const addTask = async (new_task) => {
		const res = await Api.Task.create(new_task)
		if (!res) return;
		let task_id = res;
		let task_obj = { id: task_id, description: new_task, done: false }
		dispatch(add_task(task_obj))
		toast.success(Msg.TASKINPUT.ADD)
	}

	useEffect(() => {
		const getTasks = async () => {
			let response = await Api.Task.getAll(page)
			if (!response) return;
			setTotal_pages(response["x-total-pages"]);

			if (page === 1) {
				dispatch(set_tasks(response.content));
			} else {
				dispatch(append_tasks(response.content));
			}
			setIsInitialLoading(false);
			setLoadingMore(false);
			toast.success(Msg.WELLCOME.MSG)
		};

		getTasks();
	}, [page]);

	const loadMoreTasks = async () => {
		if (loadingMore) return;
		if (page >= total_pages) return;

		setLoadingMore(true);
		setPage(prev => prev + 1);
	};

	return (
		<>
			{isInitialLoading && <LoadingScreen />}
			{!isInitialLoading &&
				(<div className='w-full min-h-screen text-neutral-800 bg-gradient-to-br from-purple-100 to-purple-600'>
					<div className='flex flex-col gap-10 min-h-screen p-5'>
						<Header />
						<div className="sticky top-2 z-10">
							<InputTasks addTask={addTask} />
						</div>
						< TasksList
							hasMore={page < total_pages}
							onLoadMore={loadMoreTasks}
							loadingMore={loadingMore}
						/>
					</div>
				</div>)
			}
		</>
	)
}

export default TodoPage
