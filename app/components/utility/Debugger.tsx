import React from 'react';
 
type DebugInfoProps = {
  data: Record<string, any>;
};

const DebugInfo: React.FC<DebugInfoProps> = ({ data }) => (
  <div
    style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '10px',
      color: 'black',
      background: 'rgba(255, 255, 255, 0.7)',
      zIndex: '1000',
      pointerEvents: 'none', 
    }}
  >
    <p>Debug Information:</p>
    {Object.entries(data).map(([key, value]) => (
      <p key={key}>{`${key}: ${JSON.stringify(value)}`}</p>
    ))}
  </div>
);

export default DebugInfo;
