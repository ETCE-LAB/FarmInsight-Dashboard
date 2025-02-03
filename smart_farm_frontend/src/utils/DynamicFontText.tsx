import React from 'react';

interface FixedFontTextProps {
  text: string;
  maxWidth: number;
  fontSize?: number;
}

const FixedFontText: React.FC<FixedFontTextProps> = ({
                                                       text,
                                                       maxWidth,
                                                       fontSize = 24,
                                                     }) => {
  return (
      <span
          style={{
            fontSize: `${fontSize}px`,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: `${maxWidth}px`,
            display: 'inline-block',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title={text}
      >
      {text}
    </span>
  );
};

export default FixedFontText;
