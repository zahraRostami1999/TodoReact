import { useEffect } from 'react';
import TodoPage from './pages/TodoPage.jsx';
import ToDo from './components/todo/ToDo.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import Auth from './services/API.jsx';


function App() {
  document.title = "HISTX ToDo List";

  let accessToken = localStorage.getItem("access");
  let refreshToken = localStorage.getItem("refresh");

  let tokenIsValid = (accessToken && refreshToken && accessToken !== 'null' && refreshToken !== 'null' && accessToken !== 'undefined' && refreshToken !== 'undefined');

  useEffect(() => {
    if (!tokenIsValid) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    else {
      if (window.location.pathname !== "/todo") {
        window.location.href = "/todo";
      }
    }
  }, [tokenIsValid]);

  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    if (refresh && refresh !== 'null' && refresh !== 'undefined') {
      const auth = new Auth();
      auth.refresh();
    }
  }, []);

  return (
    <div className="App min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/todo' element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
