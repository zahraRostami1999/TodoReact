import { useEffect } from "react"
import LoginPage from "./pages/login/LoginPage.jsx"
import HomePage from "./pages/home/HomePage.jsx"
import NotificationProvider from "./components/notification/NotificationProvider.jsx"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom" // Keep these imports
import Api from "./services/api/api.js"
import { toast } from 'react-toastify'
import Msg from './config/messages.js'

export default function App() {
	document.title = "HISTX ToDo List"

	// run only once
	useEffect(() => {
		// loged in: start token refreshing operation
		// loged out: delete old tokens
		const init = async () => await Api.Auth.init()
		init()

		document.body.addEventListener(
			'timeout', e => toast.error(Msg.COMMON.CNN)
		)
	}, [])

	const navigate = useNavigate() // Hook for navigation
	const location = useLocation() // Hook to get current location
	const pathname = location.pathname;

	// run everytime path changes
	useEffect(() => {
		// send to home page if loged in user tried to access login page
		if (Api.Auth.isLogedIn() && pathname === "/login") {
			navigate("/")
		}

		// send to login page if user is not loged in and not already on login page
		if (!Api.Auth.isLogedIn() && pathname !== "/login") {
			navigate("/login")
		}
	}, [navigate, pathname]) // Dependencies for useEffect

	return (
		<div className='App min-h-screen'>
			<NotificationProvider />
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/' element={<HomePage />} />
			</Routes>
		</div>
	)
}
