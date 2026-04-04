import { useEffect } from 'react';
import LoginPage from './pages/login/LoginPage.jsx';
import TodoPage from './pages/todo/TodoPage.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Api from './services/Api';

function App() {
  document.title = "HISTX ToDo List";

  let tokens = localStorage.getItem("myAuthTokens");
  let parse = tokens ? JSON.parse(tokens) : null;
  const accessToken = parse ? parse.access : null;
  const refreshToken = parse ? parse.refresh : null;

  let tokenIsValid = (accessToken && refreshToken && accessToken !== 'null' && refreshToken !== 'null' && accessToken !== 'undefined' && refreshToken !== 'undefined');

  useEffect(() => {
    Api.Auth.init();
    Api.Auth.isLogedIn();
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
