import React from 'react';
import Button from '@mui/material/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, 'Lirahti');
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <Button onClick={() => window.location.reload()}>Refresh page</Button>
          <Button onClick={() => this.setState({ hasError: false })}>
            Re-render
          </Button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
