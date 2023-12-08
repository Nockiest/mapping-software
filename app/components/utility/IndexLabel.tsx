import React from 'react'

type IndexLabelProps = {
    label: string;
    customStyling?: React.CSSProperties;
    customClasses?: string;
}

const IndexLabel: React.FC<IndexLabelProps> = ({ label, customStyling, customClasses }) => {
    return (
      <div className={`bg-white p-2 text-black w-8 h-8 flex items-center justify-center ${customClasses} shadow-md`} style={{ ...customStyling }}>
        <p>{label}</p>
      </div>
    );
  };

  export default IndexLabel;
