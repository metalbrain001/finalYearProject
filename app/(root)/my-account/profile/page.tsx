import Profile from "@/components/Profile";

const ProfilePage = () => {
  return (
    <main className="flex min-h-screen w-full flex-row">
      {/* ✅ Main Content */}
      <div className="user-container">
        <Profile />
      </div>
    </main>
  );
};

export default ProfilePage;
