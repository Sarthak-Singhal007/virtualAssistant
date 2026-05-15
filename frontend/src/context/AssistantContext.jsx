import React, { createContext, useContext, useState } from 'react';

const AssistantContext = createContext();

export const AssistantProvider = ({ children }) => {
  const [assistants, setAssistants] = useState([]);
  const [currentAssistant, setCurrentAssistant] = useState(null);

  const addAssistant = (assistant) => {
    setAssistants([...assistants, assistant]);
  };

  const updateAssistant = (id, updatedAssistant) => {
    setAssistants(assistants.map(a => a._id === id ? updatedAssistant : a));
  };

  return (
    <AssistantContext.Provider 
      value={{ 
        assistants, 
        setAssistants, 
        currentAssistant, 
        setCurrentAssistant,
        addAssistant,
        updateAssistant 
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistant must be used within AssistantProvider');
  }
  return context;
};
