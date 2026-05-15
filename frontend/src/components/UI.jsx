import React from 'react';

export const Button = ({ children, onClick, style, disabled, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#3498db',
        color: 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'background-color 0.2s',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ type = 'text', placeholder, value, onChange, style, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
        width: '100%',
        ...style
      }}
      {...props}
    />
  );
};

export const Card = ({ children, style }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        ...style
      }}
    >
      {children}
    </div>
  );
};
