import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { Store } from "./redux/Store.jsx"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<Provider store={Store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
)
