import React, { useState } from 'react';
import { assistantAPI } from '../services/api';
import { useAssistant } from '../context/AssistantContext';
import { Input, Button, Card } from '../components/UI';

const Customize = ({ onComplete }) => {
  const { addAssistant } = useAssistant();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: ''
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
      const response = await assistantAPI.create(formData);
      addAssistant(response.data.assistant);
      onComplete(response.data.assistant._id);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create assistant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <h2>Create Your Assistant</h2>
        {error && <div style={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <Input
            type="text"
            name="name"
            placeholder="Assistant Name (e.g., Jarvis)"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
          />
          <Button disabled={loading} style={styles.submitBtn}>
            {loading ? 'Creating...' : 'Create Assistant'}
          </Button>
        </form>
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
    maxWidth: '500px',
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontFamily: 'inherit',
    minHeight: '100px',
    resize: 'vertical'
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
  }
};

export default Customize;
