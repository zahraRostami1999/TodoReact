import { useEffect } from 'react';
import LoginPage from './pages/login/LoginPage.jsx';
import TodoPage from './pages/todo/TodoPage.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Api from './services/Api';

function App() {
  document.title = "HISTX ToDo List";

  let accessToken = localStorage.getItem("access");
  let refreshToken = localStorage.getItem("refresh");

  let tokenIsValid = (accessToken && refreshToken && accessToken !== 'null' && refreshToken !== 'null' && accessToken !== 'undefined' && refreshToken !== 'undefined');

  // useEffect(() => {
  //   Api.Auth.init();
  //   if (!tokenIsValid) {
  //     if (window.location.pathname !== "/login") {
  //       window.location.href = "/login";
  //     }
  //   }
  //   else {
  //     if (window.location.pathname !== "/todo") {
  //       window.location.href = "/todo";
  //     }
  //   }
  // }, [tokenIsValid]);

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
