import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1 style={{ color: 'black', fontSize: '3rem', fontWeight: 'bold' }}>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  };