import Header from "../components/Header";
import InputTasks from "../components/InputTasks";

const TodoPage = () => {
    return (
        <>
            <div className="w-full">
                <div className="bg-green-500 w-full">
                    <Header />
                </div>
                <div className="bg-pink-400">
                    <InputTasks />
                </div>
            </div>
        </>
    );
}

export default TodoPage;