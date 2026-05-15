import React, { useState } from 'react';
import { userAPI } from '../services/api';

export const VoiceInput = ({ assistantId, assistantName, onResponse }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript(transcript);
          handleCommand(transcript);
        } else {
          interimTranscript += transcript;
        }
      }
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const handleCommand = async (command) => {
    setIsLoading(true);
    try {
      const response = await userAPI.askAssistant({
        command,
        assistantId,
        assistantName
      });
      onResponse(response.data.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process command');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <button 
        style={{
          ...styles.button,
          backgroundColor: isListening ? '#e74c3c' : '#3498db'
        }}
        onClick={startListening}
        disabled={isLoading}
      >
        {isListening ? '🎤 Listening...' : '🎤 Start Listening'}
      </button>
      {transcript && <p style={styles.transcript}>{transcript}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center'
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  transcript: {
    marginTop: '1rem',
    color: '#2c3e50',
    fontSize: '1rem'
  }
};

export default VoiceInput;
