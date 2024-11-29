import Header from "../components/Header";
import InputTasks from "../components/InputTasks";

const TodoPage = () => {
    return (
        <>
            <div className="">
                <div>
                    <Header />
                </div>
                <div>
                    <InputTasks />
                </div>
            </div>
        </>
    );
}

export default TodoPage;