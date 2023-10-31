import React from 'react';
 
type DebugInfoProps = {
  data: Record<string, any>;
};

const DebugInfo: React.FC<DebugInfoProps> = ({ data }) => (
  <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px', background: 'rgba(255, 255, 255, 0.7)' }}>
    <p>Debug Information:</p>
    {Object.entries(data).map(([key, value]) => (
      <p key={key}>{`${key}: ${JSON.stringify(value)}`}</p>
    ))}
  </div>
);

export default DebugInfo;