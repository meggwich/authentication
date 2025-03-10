import { useState } from 'react';
import spring from '../assets/spring-flowers-magic-and-romantic-moment-from-the-nature_5120x2880.jpg';
import spring2 from '../assets/56b62ee842c3e.jpg';

interface LandingProps {
  onLogin: (token: string) => void;
}

const Landing = ({ onLogin }: LandingProps) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7070/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        throw new Error('Ошибка аутентификации');
      }

      const { token } = await response.json();
      onLogin(token); // Передаем токен в родительский компонент
    } catch {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Neto Social</a>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              className="form-control me-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Login</button>
          </form>
        </div>
      </nav>

      {error && <div className="alert alert-danger">{error}</div>}

      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={spring} className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src={spring2} className="d-block w-100" alt="..."/>
          </div>
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Landing;