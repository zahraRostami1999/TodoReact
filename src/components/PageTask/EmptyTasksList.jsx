import { BsClipboardCheck } from "react-icons/bs";

const EmptyTasksList = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm mx-auto lg:w-full w-full lg:max-w-3xl transition-all duration-500">
            <div className="bg-gradient-to-tr from-purple-200 to-purple-100 text-purple-600 p-6 rounded-full mb-6 shadow-inner">
                <BsClipboardCheck size={70} className="opacity-80" />
            </div>
            <h3 className="xl:text-2xl lg:text-2xl sm:text-lg font-bold text-gray-700 mb-3 text-center" dir="rtl">
                فعلا کاری برای امروز ثبت نکردی
            </h3>
        </div>
    )
}

export default EmptyTasksList;