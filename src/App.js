import './App.css';
import axios from 'axios';
import { useState } from 'react';
import User from './components/User';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  axios.defaults.baseURL = 'http://localhost:5000';

  const onLogin = () => {
    axios.post('/users/login', { username, password }).then((res) => {
      console.log(res.data);
      if (res.data.success && localStorage) {
        console.log('saving token to localstorage');
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
      }
    });
  };

  return (
    <div className="App">
      <form action="">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            onLogin();
          }}
        >
          Login
        </button>
      </form>
      {user ? <User user={user} /> : null}
    </div>
  );
}

export default App;
