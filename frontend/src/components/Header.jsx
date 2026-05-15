import React from 'react';

export const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>🎙️ Virtual Assistant</h1>
        <nav style={styles.nav}>
          <a href="/" style={styles.link}>Home</a>
          <a href="/profile" style={styles.link}>Profile</a>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  nav: {
    display: 'flex',
    gap: '2rem'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

export default Header;
