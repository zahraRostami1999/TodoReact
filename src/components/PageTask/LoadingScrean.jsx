import Msg from "../../config/messages";

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 flex flex-col h-dvh overflow-hidden items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200">
            <div className="relative w-20 h-20">
                <div className="absolute w-20 h-20 border-4 border-purple-300 rounded-full animate-ping"></div>
                <div className="w-20 h-20 border-t-4 border-b-4 border-purple-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-purple-700 font-semibold text-lg animate-pulse" dir="rtl">
                {Msg.LOADING.MSG}
            </p>
        </div>
    );
};

export default LoadingScreen;
