import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
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
    
    console.log('Signup form submitted:', formData);
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    const url = 'http://localhost:5000/api/auth/signup';
    console.log('Making signup request to:', url);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      
      console.log('Signup response status:', response.status);
      
      const data = await response.json();
      console.log('Signup response data:', data);
      
      if (data.success) {
        setMessage('Account created successfully! Redirecting to login...');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
      
    } catch (error) {
      console.error('Signup frontend error:', error);
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '2px solid #e1e5e9',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    outline: 'none',
    fontFamily: 'inherit'
  };

  const focusStyles = {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    transform: 'translateY(-1px)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '20%',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        animation: 'slideUp 0.8s ease-out'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
          }}>
            <span style={{ fontSize: '28px', color: 'white' }}>👤</span>
          </div>
          <h2 style={{
            margin: '0 0 8px 0',
            color: '#2d3748',
            fontSize: '28px',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>
            Create Account
          </h2>
          <p style={{
            margin: '0',
            color: '#718096',
            fontSize: '16px'
          }}>
            Join us today! Please fill in your details
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '16px',
            marginBottom: '20px',
            backgroundColor: '#fed7d7',
            border: '1px solid #fc8181',
            borderRadius: '12px',
            color: '#c53030',
            fontSize: '14px',
            animation: 'shake 0.5s ease-in-out'
          }}>
            <span style={{ marginRight: '8px' }}>⚠️</span>
            {error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div style={{
            padding: '16px',
            marginBottom: '20px',
            backgroundColor: '#c6f6d5',
            border: '1px solid #68d391',
            borderRadius: '12px',
            color: '#2f855a',
            fontSize: '14px',
            animation: 'slideDown 0.5s ease-out'
          }}>
            <span style={{ marginRight: '8px' }}>✅</span>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a5568',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyles}
              placeholder="Enter your full name"
              required
              onFocus={(e) => {
                Object.assign(e.target.style, focusStyles);
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a5568',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyles}
              placeholder="Enter your email"
              required
              onFocus={(e) => {
                Object.assign(e.target.style, focusStyles);
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a5568',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  ...inputStyles,
                  paddingRight: '50px'
                }}
                placeholder="Enter your password (min 6 characters)"
                required
                onFocus={(e) => {
                  Object.assign(e.target.style, focusStyles);
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e1e5e9';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#718096'
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a5568',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  ...inputStyles,
                  paddingRight: '50px'
                }}
                placeholder="Confirm your password"
                required
                onFocus={(e) => {
                  Object.assign(e.target.style, focusStyles);
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e1e5e9';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#718096'
                }}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading 
                ? 'linear-gradient(135deg, #a0aec0, #cbd5e0)' 
                : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading 
                ? 'none' 
                : '0 4px 15px rgba(102, 126, 234, 0.4)',
              transform: loading ? 'none' : 'translateY(0)',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  border: '2px solid #ffffff',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '10px'
                }}></span>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div style={{
          textAlign: 'center',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <p style={{ margin: '0', color: '#718096', fontSize: '14px' }}>
            Already have an account?{' '}
            <a
              href="/login"
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#5a67d8'}
              onMouseOut={(e) => e.target.style.color = '#667eea'}
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Signup;