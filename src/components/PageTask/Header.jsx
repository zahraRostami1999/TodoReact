import { useNavigate } from "react-router-dom"
import Api from "../../services/api/api.js"
import { IoIosLogOut } from "react-icons/io"

const Header = () => {
	const navigate = useNavigate()

	const logout = async () => {
		await Api.Auth.logout()
		navigate("/login")
	}

	return (
		<>
			<header className='w-full'>
				<div className='font-sans font-semibold flex justify-center flex-w w-full'>
					<div className='w-full sm:text-center xs:text-center md:text-left lg:text-left '>
						<div className='flex items-center justify-between'>
							<h1
								className='text-4xl hover:scale-95 cursor-pointer transition-all duration-300 
								backdrop-blur-md bg-white/5'
								onClick={logout}
							>
								<IoIosLogOut
									size={28}
									className='hover:text-red-500 transition-all duration-300'
								/>
							</h1>
							<h1 className='relative sm:text-3xl font-[vazir] text-neutral-700 md:text-4xl
							 lg:text-5xl font-bold py-2 backdrop-blur-md bg-white/10'>
								لیست وظایف
							</h1>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}

export default Header
