import React from 'react';

const variants = {
  danger: 'F16360',
  warning: '#FFA117',
  success: '#008B8B',
};

const AlertMessageBox = (success, warning, danger) => {
  return success ? (
    <div style={{ backgroundColor: variants.success }}>{success.children}</div>
  ) : warning ? (
    <div style={{ backgroundColor: variants.warning }}>{warning.children}</div>
  ) : danger ? (
    <div style={{ backgroundColor: variants.danger }}>{danger.children}</div>
  ) : (
    ''
  );
};

export default AlertMessageBox;
