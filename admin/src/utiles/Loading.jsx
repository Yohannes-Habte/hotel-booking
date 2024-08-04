import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

// Create a universal loading
const Loading = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden"> Loading... </span>
    </Spinner>
  );
};

export default Loading;