import { useState } from 'react';

function Login({ type, onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [showLoginCard, setShowLoginCard] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (response.ok) {
        onLogin(result);
      } else {
        setMessage(result.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Error during login');
    }
  };

  return (<>
    {!showLoginCard && (
      <button onClick={() => setShowLoginCard(true)} className="show-login-btn">Admin Login</button>
    )}
    <div>
      {showLoginCard && (
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Admin Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          {message && <div className="message">{message}</div>}
        </form>
      )}
    </div>
  </>);
}

export default Login;
