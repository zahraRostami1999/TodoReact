import Header from "../components/Header";
import InputTasks from "../components/InputTasks";
import TasksList from "../components/TasksList";

const TodoPage = () => {

    const myTasks = [
        { title: "تمرین React برای یک ساعت", status: false },
        { title: "یادگیری Tailwind و استایل‌دهی تسک‌ها", status: true },
        { title: "حل ۲ تا باگ در xfvxcvfdnvjkjdsnhfvndhsjkfhnsdjhfsdhfsdhfkjajdolefshfsdrhfgvhsdgvxvkxgvsrdhtfgiursehftiushgvihsdighvidfhgvbdfxbgvishfcishgosirgojxdgvbddhgiudhrfghsdjfgvjdgolherghierhg,nxzkcgvsiurgfg;ljdsfgjojresojgesrgojdsroighkdfjgbsrigtisdjrjperpgjrioeguihidhgjdgkjdsrogyujoiejrtgjlkjdslkfjgiouerhgkzxjngvjzfdgberhjgberitgkejrgkjdfgbedghedresrjkckldsnvvndvjdjbrgggreigbs.dnmfvlsanfa'alwe[rawe,lf;sdkmgvsdkmgksdgsdkgprd.xc,bmkdlmdپروژه", status: false },
        { title: "مرور کدنویسی و ریفکتور سبک", status: false },
    ];

    return (
        <>
            <div className='w-full min-h-screen overflow-hidden text-neutral-800 bg-gradient-to-br from-purple-50 to-purple-400'>
                <div className='flex flex-col gap-10 h-full overflow-hidden p-5'>
                    {/* header */}
                    <Header />
                    {/* input */}
                    <InputTasks />
                    {/* list */}
                    <TasksList initialTasks={myTasks} />
                </div>
            </div>
        </>
    );
}

export default TodoPage;