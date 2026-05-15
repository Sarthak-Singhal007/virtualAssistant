import React, { useState } from 'react';
import './index.css';
import Header from './components/Header';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Customize from './pages/Customize';
import AssistantPage from './pages/Assistant';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import { AssistantProvider } from './context/AssistantContext';

const AppContent = () => {
  const { token } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedAssistantId, setSelectedAssistantId] = useState(null);

  const handleSelectAssistant = (id) => {
    if (id === 'create') {
      setCurrentPage('customize');
    } else {
      setSelectedAssistantId(id);
      setCurrentPage('assistant');
    }
  };

  const handleCreateComplete = (id) => {
    setSelectedAssistantId(id);
    setCurrentPage('assistant');
  };

  if (!token) {
    return <Auth onAuthSuccess={() => setCurrentPage('home')} />;
  }

  return (
    <>
      <Header />
      {currentPage === 'home' && (
        <Home onSelectAssistant={handleSelectAssistant} />
      )}
      {currentPage === 'customize' && (
        <Customize onComplete={handleCreateComplete} />
      )}
      {currentPage === 'assistant' && (
        <AssistantPage 
          assistantId={selectedAssistantId}
          onBack={() => setCurrentPage('home')}
        />
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AssistantProvider>
        <AppContent />
      </AssistantProvider>
    </AuthProvider>
  );
}

export default App;
