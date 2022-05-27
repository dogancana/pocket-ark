import React, { PropsWithChildren } from 'react';

class ErrorBoundary extends React.Component<
  PropsWithChildren<{ message: string }>
> {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    // console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if ((this.state as any).hasError) {
      // You can render any custom fallback UI
      return (
        <div
          className="container mx-auto"
          data-error-message={this.props.message}
        ></div>
      );
    }

    // Return children components in case of no error

    return (this.props as any).children;
  }
}

export default ErrorBoundary;
