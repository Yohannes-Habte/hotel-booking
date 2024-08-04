import React from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertMessageBox = (color) => {
  return (
    <Alert variant={color.variant || 'info'} className="message-box">
      {color.children}
    </Alert>
  );
};

export default AlertMessageBox;
