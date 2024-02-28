import React from "react";
// import { toAbsoluteUrl } from '../helpers/AssetsHelpers';

import ERROR_BG_IMAGE from "../../assets/images/bg5.jpg";

/**
 * Error boundaries
 */
interface ErrorBoundaryProps {
  children: React.ReactNode | any;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="d-flex flex-column flex-root">
          <div
            className="error error-5 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
            style={{
              backgroundImage: `url(${ERROR_BG_IMAGE})`,
            }}
          >
            <div className="container d-flex flex-row-fluid flex-column justify-content-md-center p-12">
              <h1 className="error-title font-weight-boldest text-info mt-10 mt-md-0 mb-12">
                Oops!
              </h1>
              <p className="font-weight-boldest display-4">
                Something went wrong here.
              </p>
              <p className="font-size-h3">
                We're working on it and we'll get it fixed as soon possible.You
                can refresh or use our Help Center.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
