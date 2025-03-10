import './App.css'
import { useState } from 'react';
import Landing from './components/Landing';
import User from './components/User';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const handleLogin = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <User token={token} onLogout={handleLogout} />
      ) : (
        <Landing onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;