import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import MSideBar from "./Component/Mobile/MSideBar";
import MChat from "./Component/Mobile/MChat";

function App() {
  const { currentUser, DeviceInfo } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (currentUser) {
      return children;
    }
    return <Navigate to="/login" />;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/chat" element={<MChat />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
