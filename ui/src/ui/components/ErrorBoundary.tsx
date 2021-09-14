import React from 'react';
import Button from '@mui/material/Button';

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, 'Lirahti');
  }

  render() {
    // @ts-ignore
    const { hasError } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;

    if (hasError) {
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

    return children;
  }
}

export default ErrorBoundary;
