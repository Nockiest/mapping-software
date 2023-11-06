import React from 'react'

type LineTypeSettingsProps = {
    lineType: "rounded" | "squared";
    handleLineTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  };
  

const LineTypeSettings: React.FC<LineTypeSettingsProps> = ({ lineType, handleLineTypeChange }) => {
  return (
    <label>
      Line Type:
      <select value={lineType} onChange={handleLineTypeChange} className="text-black">
        <option value="rounded">Rounded</option>
        <option value="squared">Squared</option>
      </select>
    </label>
  );
};


export default LineTypeSettings