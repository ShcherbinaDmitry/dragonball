import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./Error";
import { useDispatch } from 'react-redux';
import { resetState } from '../../slices/gamesSlice.js';

const ErrorHandler = (props) => {
  const dispatch = useDispatch();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorComponent}
      onError={(error, errorInfo) => {
        console.log('Error boundry error!');
        console.log(error);
        console.log(errorInfo);
      }}
      onReset={() => {
        dispatch(resetState());
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
};

export default ErrorHandler;