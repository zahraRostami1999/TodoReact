import { useState, useEffect } from "react"
import Api from "../../services/api/api.js"
import { Header, InputTasks, TasksList, LoadingScreen } from "../../components/PageTask/index"
import { useDispatch } from "react-redux";
import { set_tasks, append_tasks, add_task } from "../../redux/TaskSlice";
import Msg from "../../config/messages.js";
import { toast } from "react-toastify";
import image from "../../assets/bg.svg";

function TodoPage() {
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const [isAddLoading, setIsAddLoading] = useState(false);
	const [page, setPage] = useState(1)
	const [total_pages, setTotal_pages] = useState()
	const [loadingMore, setLoadingMore] = useState(false);
	const dispatch = useDispatch();

	const addTask = async (new_task) => {
		setIsAddLoading(true);
		const res = await Api.Task.create(new_task)
		if (!res) {
			setIsAddLoading(false);
			toast.error(Msg.TASKINPUT.ERR);
			return;
		};
		let task_id = res;
		let task_obj = { id: task_id, description: new_task, done: false }
		dispatch(add_task(task_obj))
		setIsAddLoading(false);
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
		};

		getTasks();
	}, [page]);

	useEffect(() => {
		if (isInitialLoading) return;
		toast.success(Msg.WELLCOME.MSG);
	},[isInitialLoading])

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
				<div className="w-full min-h-screen text-neutral-800 bg-gradient-to-br from-purple-100 to-purple-600 relative">
					<div
						className="fixed inset-0 pointer-events-none opacity-30"
						style={{
							backgroundImage: `url(${image})`,
							backgroundRepeat: 'repeat',
							backgroundSize: 'contain',
							backgroundPosition: 'center',
							zIndex: 0
						}}
					/>
					<div className="relative z-10 flex flex-col gap-10 min-h-screen p-5">
						<Header />
						<div className="sticky top-2 z-20">
							<InputTasks addTask={addTask} loading={isAddLoading} />
						</div>
						<TasksList
							hasMore={page < total_pages}
							onLoadMore={loadMoreTasks}
							loadingMore={loadingMore}
						/>
					</div>
				</div>
			}

		</>
	)
}

export default TodoPage
