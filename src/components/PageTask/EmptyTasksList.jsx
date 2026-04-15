import { BsClipboardCheck } from "react-icons/bs";

const EmptyTasksList = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm mx-auto lg:w-11/12 w-full lg:max-w-3xl transition-all duration-500">
            <div className="bg-gradient-to-tr from-purple-200 to-purple-100 text-purple-600 p-6 rounded-full mb-6 shadow-inner">
                <BsClipboardCheck size={70} className="opacity-80" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3 text-center">
                لیست کارهای شما خالیه!
            </h3>
        </div>
    )
}

export default EmptyTasksList;