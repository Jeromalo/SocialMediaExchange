//imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from './components/useToken';
//components
import Login from './components/Login';
import SignUp from './components/SignUp';
import Password from './components/Password';


function App() {

  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} token={token} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password" element={<Password />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
