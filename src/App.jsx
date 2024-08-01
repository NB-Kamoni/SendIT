import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import 'semantic-ui-css/semantic.min.css'
import HomepageLayout from "./components/home/HomepageLayout";
import UserDashboard from "./components/user-dashboard/UserDashboard";
import Dashboard from "./components/home/Dashboard";
import Help from "./components/help/Help"
import Send from "./components/send/Send";
import Receive from "./components/receive/Receive";

import Analytics from "./components/analytics/Analytics";
import Navbar from "./components/navbar/Navbar";




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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/help" element={<Help />} />
        <Route path="/send" element={<Send />} />
        <Route path="/receive" element={<Receive />} />
        <Route path="/analytics" element={<Analytics />} />
 
        
        
        


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
