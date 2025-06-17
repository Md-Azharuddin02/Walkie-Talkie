import React, { useState } from 'react';

function SubmitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // After submission logic
    setIsSubmitting(false);
    alert('Form submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form inputs go here */}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="spinner"></span>
        ) : (
          'Submit'
        )}
      </button>

      {/* Optional: Spinner styling */}
      <style>
        {`
          .spinner {
            border: 2px solid #f3f3f3;
            border-top: 2px solid #3498db;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            animation: spin 0.8s linear infinite;
            display: inline-block;
            vertical-align: middle;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          button[disabled] {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `}
      </style>
    </form>
  );
}

export default SubmitForm;
