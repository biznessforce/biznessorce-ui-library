import React from "react";
// import { toAbsoluteUrl } from '../helpers/AssetsHelpers';

import ERROR_BG_IMAGE from "../../assets/images/bg5.jpg";
import { LEGACY_BOOTSTRAP } from "../legacyBootstrap";

/** `true` while the viewport is at least `px` wide (Bootstrap's breakpoints, which differ from antd's at xxl). */
const useMinWidth = (px: number) => {
  const query = `(min-width: ${px}px)`;
  const [matches, setMatches] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
};

/**
 * Exact Bootstrap 5.3 equivalents of the classes that applied before (`container`, `d-flex`, `flex-column`,
 * `justify-content-md-center`, `text-info`, `display-4`). The Metronic classes (`flex-root`, `flex-row-fluid`,
 * `error error-5`, `bgi-*`, `p-12`, `mt-10`, `mb-12`, `font-weight-boldest`, `font-size-h3`, `error-title`)
 * never matched any CSS and are dropped, not translated. Heading/paragraph base styles come from the
 * app's reboot (Bootstrap today, the design-system base CSS later). A redesign belongs to DS4/DS6.
 */
const ErrorFallback = () => {
  const sm = useMinWidth(576);
  const md = useMinWidth(768);
  const lg = useMinWidth(992);
  const xl = useMinWidth(1200);
  const xxl = useMinWidth(1400);
  const containerMaxWidth = xxl ? 1320 : xl ? 1140 : lg ? 960 : md ? 720 : sm ? 540 : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", backgroundImage: `url(${ERROR_BG_IMAGE})` }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: md ? "center" : undefined,
            width: "100%",
            maxWidth: containerMaxWidth,
            paddingInline: 12,
            marginInline: "auto",
          }}
        >
          <h1 style={{ color: LEGACY_BOOTSTRAP.info }}>Oops!</h1>
          <p
            style={{
              fontSize: xl ? "3.5rem" : "calc(1.475rem + 2.7vw)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            Something went wrong here.
          </p>
          <p>
            We're working on it and we'll get it fixed as soon possible.You
            can refresh or use our Help Center.
          </p>
        </div>
      </div>
    </div>
  );
};

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
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
