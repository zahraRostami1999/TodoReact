const BASE_BTN = "flex items-center justify-center transition-all duration-300 cursor-pointer";

export const STYLES = {
    DROPDOWN: `${BASE_BTN} w-6 h-8 text-[22px] rounded-full transition-colors duration-300`,
    ACTION: `${BASE_BTN} w-[25px] h-[25px] rounded-full font-bold text-white text-2xl`,
    ICON_BASE: `${BASE_BTN} py-2 hover:scale-105 space-x-2`,
    DROPDOWN_ACTIVE: "bg-orange-400 text-white",
    DROPDOWN_INACTIVE: "text-purple-800 hover:bg-purple-100"
};
