import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Profile</h1>

      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <p>Please login to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;