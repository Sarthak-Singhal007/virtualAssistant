import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { Input, Button, Card } from '../components/UI';

const Auth = ({ onAuthSuccess }) => {
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (isSignUp) {
        response = await authAPI.signup(formData);
      } else {
        response = await authAPI.signin({
          email: formData.email,
          password: formData.password
        });
      }

      const { token, user } = response.data;
      login(user, token);
      onAuthSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          {isSignUp && (
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required={isSignUp}
            />
          )}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button disabled={loading} style={styles.submitBtn}>
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </Button>
        </form>
        <p style={styles.toggleText}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={styles.toggleBtn}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '1rem'
  },
  card: {
    maxWidth: '400px',
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  submitBtn: {
    width: '100%',
    marginTop: '1rem'
  },
  error: {
    color: '#e74c3c',
    padding: '0.75rem',
    backgroundColor: '#fadbd8',
    borderRadius: '4px',
    marginBottom: '1rem'
  },
  toggleText: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#3498db',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};

export default Auth;
