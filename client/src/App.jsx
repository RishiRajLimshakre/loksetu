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
import EditIssuePage from "./pages/EditIssuePage";
import TopBar from "./components/TopBar";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <div className="app-shell">
      <div className="app-bg">
        <div className="app-bg__blob app-bg__blob--one"></div>
        <div className="app-bg__blob app-bg__blob--two"></div>
        <div className="app-bg__blob app-bg__blob--three"></div>
      </div>

      <div className="app-content">
        <TopBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/issues/:id" element={<IssueDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/map" element={<MapPage />} />
          <Route
            path="/edit-issue/:id"
            element={
              <ProtectedRoute>
                <EditIssuePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
