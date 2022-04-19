import React from "react";

const ErrorComponent = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="alert alert-danger">
      <p>Что-то пошло не так:</p>
      <pre>{error.message}</pre>
      <button className="btn btn-danger" onClick={resetErrorBoundary}>Попробовать снова...</button>
  </div>
  );
};

export default ErrorComponent;
