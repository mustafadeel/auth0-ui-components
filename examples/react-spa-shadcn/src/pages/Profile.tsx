import Header from '@/components/Header';

const Profile = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">User Profile</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Multi-Factor Authentication</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">UserMFAMgmt Component Placeholder</p>
            <p className="text-sm text-gray-400 mt-2">
              This is where the UserMFAMgmt component will be placed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
