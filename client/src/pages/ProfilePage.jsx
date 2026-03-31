import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <section className="page-shell">
      <div className="page-card">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtext">
          View your account details and manage your LokSetu session.
        </p>

        {user ? (
          <>
            <div className="form-group">
              <p className="form-label">Name</p>
              <p>{user.name}</p>
            </div>

            <div className="form-group">
              <p className="form-label">Email</p>
              <p>{user.email}</p>
            </div>

            <div className="form-group">
              <p className="form-label">Role</p>
              <p>{user.role}</p>
            </div>

            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <p className="message-error">Please login to view your profile.</p>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
