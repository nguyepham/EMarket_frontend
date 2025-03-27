// src/components/LogoutButton.tsx

import { useNavigate } from 'react-router';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove the JWT
    localStorage.removeItem('jwt');

    // 2. Redirect to login
    navigate('/', { replace: true });

    // 3. Optional: reset global state, clear cache, etc.
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Log Out
    </button>
  );
}
