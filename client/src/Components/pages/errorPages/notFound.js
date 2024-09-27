import React from 'react';
import './notFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default NotFound;