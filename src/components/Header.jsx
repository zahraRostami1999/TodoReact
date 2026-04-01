const Header = () => {
    
  const logout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    window.location.href = "/login";
  }

    return (
        <>
            <header className='w-full'>
                <div className="py-1 font-sans font-semibold flex justify-center flex-w sm:w-full md:w-11/12 lg:w-full">
                    <div className="w-full sm:text-center xs:text-center md:text-left lg:text-left ">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl hover:scale-95 cursor-pointer transition-all duration-300" onClick={logout}>
                                🚪
                            </h1>
                            <h1 className="sm:text-3xl text-neutral-700 md:text-4xl lg:text-5xl font-bold ">HISTX  To-Do List</h1>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;