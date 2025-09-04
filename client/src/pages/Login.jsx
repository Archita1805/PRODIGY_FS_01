import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    
    console.log('Login form submitted:', formData);
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    const url = 'http://localhost:5000/api/auth/login';
    console.log('Making login request to:', url);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      console.log('Login response status:', response.status);
      
      const data = await response.json();
      console.log('Login response data:', data);
      
      if (data.success) {
        setMessage('Login successful! Redirecting...');
        
        // Store authentication data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Clear form
        setFormData({
          email: '',
          password: ''
        });
        
        // Redirect to dashboard or home page after 1 second
        setTimeout(() => {
          window.location.href = '/dashboard'; // Change this to your desired route
        }, 1000);
        
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
      
    } catch (error) {
      console.error('Login frontend error:', error);
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot password functionality will be implemented soon!');
    // You can implement forgot password logic here
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Login to Your Account</h2>
      
      {error && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '15px', 
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          color: '#721c24'
        }}>
          {error}
        </div>
      )}
      
      {message && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '15px', 
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          color: '#155724'
        }}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #ccc' 
            }}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #ccc' 
            }}
            placeholder="Enter your password"
            required
          />
        </div>
        
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
          <button 
            type="button" 
            onClick={handleForgotPassword}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#007bff', 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Forgot Password?
          </button>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account? {' '}
        <a href="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>
          Sign up here
        </a>
      </p>
    </div>
  );
};

export default Login;