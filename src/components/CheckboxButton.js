import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

const CheckboxButton = ({ children, className, onClick }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className={`checkbox-button ${className || ''}`}
      onClick={onClick}
      style={{ fontSize: '16px' }}>
      <div
        style={{
          width: '48px',
          height: '48px',
          flexShrink: '0',
          borderRadius: '8px',
          marginRight: '8px'
        }}>
        {checked ? <GrCheckbox size="xlarge" /> : <GrCheckboxSelected />}
      </div>
      {children}
    </div>
  );
};

export default CheckboxButton;
