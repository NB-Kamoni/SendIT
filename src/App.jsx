import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import 'semantic-ui-css/semantic.min.css'
import HomepageLayout from "./components/home/HomepageLayout";


function Main() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomepageLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
       

      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
}

export default App;
