import React, { useEffect, useState } from 'react';
import VoiceInput from '../components/VoiceInput';
import { assistantAPI } from '../services/api';
import { Card } from '../components/UI';

const Assistant = ({ assistantId, onBack }) => {
  const [assistant, setAssistant] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssistant();
  }, [assistantId]);

  const fetchAssistant = async () => {
    try {
      const response = await assistantAPI.getById(assistantId);
      setAssistant(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assistant:', error);
      setLoading(false);
    }
  };

  const handleResponse = (response) => {
    setResponses(prev => [...prev, response]);
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!assistant) {
    return <div style={styles.error}>Assistant not found</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>← Back</button>
      
      <Card style={styles.header}>
        <img 
          src={assistant.image || 'https://via.placeholder.com/150'} 
          alt={assistant.name}
          style={styles.image}
        />
        <h1>{assistant.name}</h1>
        <p>{assistant.description}</p>
      </Card>

      <VoiceInput 
        assistantId={assistantId}
        assistantName={assistant.name}
        onResponse={handleResponse}
      />

      <div style={styles.responses}>
        {responses.map((response, index) => (
          <Card key={index} style={styles.responseCard}>
            <p><strong>You:</strong> {response.userInput}</p>
            <p><strong>{assistant.name}:</strong> {response.response}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  backBtn: {
    padding: '0.5rem 1rem',
    marginBottom: '1rem',
    background: 'none',
    border: 'none',
    color: '#3498db',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem'
  },
  responses: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  responseCard: {
    backgroundColor: '#ecf0f1'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.1rem'
  },
  error: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.1rem',
    color: '#e74c3c'
  }
};

export default Assistant;
