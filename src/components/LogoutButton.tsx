import { useNavigate } from 'react-router';
import { Button, LogOutIcon, majorScale } from 'evergreen-ui';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove the JWT
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
    window.dispatchEvent(new Event('localStorageChange'))

    navigate('/', { replace: true });
  };

  return (
    <Button 
      background='yellowTint'
      appearance='minimal'
      onClick={handleLogout}
      style={{ }}
    >
      Log Out
    </Button>
  );
}
