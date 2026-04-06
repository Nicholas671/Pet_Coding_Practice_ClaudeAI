import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCharacters from "./pages/MyCharacters";
import CharacterBuilder from "./pages/CharacterBuilder";

// Returns true if the user has a token stored (i.e. is logged in)
const isAuthenticated = () => !!localStorage.getItem("token");

// Wraps a route so that unauthenticated users are sent to /login instead
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes — requires a valid token */}
        <Route path="/characters" element={<PrivateRoute><MyCharacters /></PrivateRoute>} />
        <Route path="/builder" element={<PrivateRoute><CharacterBuilder /></PrivateRoute>} />

        {/* Default: send everyone to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
