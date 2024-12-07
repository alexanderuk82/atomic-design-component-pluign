import React from 'react';

const App: React.FC = () => {
  const handleCreateButton = () => {
    parent.postMessage({ pluginMessage: { type: 'create-button' } }, '*');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ 
        fontSize: '24px', 
        marginBottom: '20px',
        color: '#333'
      }}>
        Atomic Design Components
      </h1>
      
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <h2 style={{
          fontSize: '18px',
          marginBottom: '16px',
          color: '#444'
        }}>
          Buttons
        </h2>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          <button
            onClick={handleCreateButton}
            style={{
              backgroundColor: '#0D99FF',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0B87E3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0D99FF'}
          >
            Create Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
