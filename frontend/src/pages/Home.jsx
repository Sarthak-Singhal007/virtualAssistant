import React, { useEffect, useState } from 'react';
import { assistantAPI } from '../services/api';
import { useAssistant } from '../context/AssistantContext';
import AssistantCard from '../components/AssistantCard';
import { Card, Button } from '../components/UI';

const Home = ({ onSelectAssistant }) => {
  const { assistants, setAssistants } = useAssistant();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssistants();
  }, []);

  const fetchAssistants = async () => {
    try {
      const response = await assistantAPI.getAll();
      setAssistants(response.data);
    } catch (error) {
      console.error('Error fetching assistants:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading assistants...</div>;
  }

  return (
    <div style={styles.container}>
      <Card style={styles.header}>
        <h1>Welcome to Virtual Assistant</h1>
        <p>Select an assistant or create a new one</p>
        <Button onClick={() => onSelectAssistant('create')}>
          ➕ Create New Assistant
        </Button>
      </Card>

      <div style={styles.grid}>
        {assistants.map(assistant => (
          <AssistantCard
            key={assistant._id}
            assistant={assistant}
            onClick={() => onSelectAssistant(assistant._id)}
          />
        ))}
      </div>

      {assistants.length === 0 && (
        <Card style={styles.empty}>
          <p>No assistants yet. Create your first one!</p>
        </Card>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.1rem'
  },
  empty: {
    textAlign: 'center',
    padding: '2rem'
  }
};

export default Home;
