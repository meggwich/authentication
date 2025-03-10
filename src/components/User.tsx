import { useEffect, useState } from 'react';

interface UserProps {
  token: string;
  onLogout: () => void;
}

const User: React.FC<UserProps> = ({ token, onLogout }) => {
  interface User {
    name: string;
    avatar: string;
  }
  
  const [user, setUser] = useState<User | null>(null);
  interface NewsItem {
    id: number;
    image: string;
    title: string;
    content: string;
  }

  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загрузка данных пользователя
        const userResponse = await fetch('http://localhost:7070/private/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Ошибка загрузки данных пользователя');
        }

        const userData = await userResponse.json();
        setUser(userData);

        // Загрузка новостей
        const newsResponse = await fetch('http://localhost:7070/private/news', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!newsResponse.ok) {
          throw new Error('Ошибка загрузки новостей');
        }

        const newsData = await newsResponse.json();
        setNews(newsData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        onLogout(); // Разлогиниваем пользователя при ошибке 401
      }
    };

    fetchData();
  }, [token, onLogout]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Neto Social</a>
          <div className="d-flex align-items-center">
            <span style={{ marginRight: '2rem' }}>Hello, {user.name}</span>
            <img
              src={user.avatar}
              alt="Avatar"
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
            />
            <button className="btn btn-outline-danger ms-3" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="cont">
        <div className="flex-container">
          {news.map((item) => (
            <div className="card" style={{ width: '18rem' }} key={item.id}>
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;