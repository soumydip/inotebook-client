import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navber from "./component/Navber";
import Home from "./component/Home";
import About from "./component/About";
import Help from "./component/Help";
import Login from "./userRoutes/Login";
import SignUp from "./userRoutes/SignUp";
import RecycleBin from "./notesRoutes/RecycleBin";
import TermsAndConditions from "./component/TermsAndConditions ";
import AddNote from "./notesRoutes/AddNote";
import ProtectedRoute from "./othersRoutes/ProtectedRoute"; 
import Profile from "./userRoutes/Profile";
import UserSetting from "./userRoutes/UserSetting";
import ResetPassword from "./userRoutes/ResetPassword";
import { useTheme } from "./othersRoutes/AllContext";
import UpdateProfile from "./userRoutes/UpdateProfile";
function App() {
  const { theme } = useTheme();
  return (
    <div className={`min-vh-100 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <Router>
        <Navber />
        <Routes>
          {/* Public Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/inotebook/terms-and-conditions" element={<TermsAndConditions />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/recycle-bin" element={<RecycleBin />} />
            <Route path="/add-note" element={<AddNote />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<UserSetting />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
