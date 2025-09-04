import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        handleLogout();
      }
    } else {
      // No user data found, redirect to login
      window.location.href = '/login';
    }
    
    setLoading(false);
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // Clear stored data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Redirect to login
    window.location.href = '/login';
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ 
            margin: '0 0 10px 0',
            color: '#333',
            fontSize: '2.5em',
            fontWeight: 'bold'
          }}>
            {getGreeting()}, {user.name}! 👋
          </h1>
          <p style={{ 
            margin: '0',
            color: '#666',
            fontSize: '1.1em'
          }}>
            Welcome to your dashboard
          </p>
        </div>
        
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
        >
          Logout
        </button>
      </div>

      {/* User Info Card */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          margin: '0 0 15px 0',
          color: '#333',
          fontSize: '1.8em'
        }}>
          Your Profile
        </h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#495057' }}>Full Name</h3>
            <p style={{ margin: '0', fontSize: '1.1em', color: '#333' }}>{user.name}</p>
          </div>
          
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#495057' }}>Email</h3>
            <p style={{ margin: '0', fontSize: '1.1em', color: '#333' }}>{user.email}</p>
          </div>
          
          <div style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#495057' }}>Member Since</h3>
            <p style={{ margin: '0', fontSize: '1.1em', color: '#333' }}>
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
            </p>
          </div>
          
          {user.lastLogin && (
            <div style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#495057' }}>Last Login</h3>
              <p style={{ margin: '0', fontSize: '1.1em', color: '#333' }}>
                {new Date(user.lastLogin).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Date & Time Card */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          margin: '0 0 15px 0',
          color: '#333',
          fontSize: '1.8em'
        }}>
          Current Date & Time
        </h2>
        
        <div style={{ 
          fontSize: '1.2em',
          color: '#555'
        }}>
          <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
            {formatDate(currentTime)}
          </p>
          <p style={{ 
            margin: '10px 0',
            fontSize: '2em',
            color: '#007bff',
            fontWeight: 'bold'
          }}>
            {formatTime(currentTime)}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0',
          color: '#333',
          fontSize: '1.8em'
        }}>
          Quick Actions
        </h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <button style={{
            padding: '15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          onClick={() => alert('Profile update feature coming soon!')}>
            Edit Profile
          </button>
          
          <button style={{
            padding: '15px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          onClick={() => alert('Settings feature coming soon!')}>
            Settings
          </button>
          
          <button style={{
            padding: '15px',
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          onClick={() => alert('Help feature coming soon!')}>
            Help & Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;