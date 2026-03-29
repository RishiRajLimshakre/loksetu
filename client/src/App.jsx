import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateIssuePage from "./pages/CreateIssuePage";
import MyReportsPage from "./pages/MyReportsPage";
import IssueDetailsPage from "./pages/IssueDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import MapPage from "./pages/MapPage";

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/issues/:id" element={<IssueDetailsPage />} />
        <Route
          path="/create-issue"
          element={
            <ProtectedRoute>
              <CreateIssuePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-reports"
          element={
            <ProtectedRoute>
              <MyReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />
        <Route path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  );
};

export default App;
