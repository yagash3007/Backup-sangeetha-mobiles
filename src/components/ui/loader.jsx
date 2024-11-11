// Component
import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <style jsx>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left-color: #4a90e2; /* Change to your preferred color */
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s infinite linear;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;