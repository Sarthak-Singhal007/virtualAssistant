import React from 'react';

export const AssistantCard = ({ assistant, onClick }) => {
  return (
    <div 
      style={styles.card}
      onClick={onClick}
    >
      <img 
        src={assistant.image || 'https://via.placeholder.com/150'} 
        alt={assistant.name}
        style={styles.image}
      />
      <h3 style={styles.name}>{assistant.name}</h3>
      <p style={styles.description}>{assistant.description || 'Your AI assistant'}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s, boxShadow 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  image: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem'
  },
  name: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    color: '#2c3e50'
  },
  description: {
    color: '#7f8c8d',
    fontSize: '0.9rem'
  }
};

export default AssistantCard;
