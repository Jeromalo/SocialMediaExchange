//imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from './components/useToken';
//components
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {

  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} token={token} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
