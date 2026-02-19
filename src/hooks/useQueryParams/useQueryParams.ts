// useQueryParams using vanilla JavaScript (no React Router dependency)
import { useCallback, useState, useEffect } from "react";

export const useQueryParams = () => {
  // Force re-render when URL changes
  const [, forceUpdate] = useState(0);

  // Listen for URL changes (browser back/forward, manual updates)
  useEffect(() => {
    const handleUrlChange = () => forceUpdate((n) => n + 1);
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const getQueryParam = useCallback((key: string) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  }, []);

  const setQueryParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    
    // Update URL without page reload using History API
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
    
    // Trigger popstate to update components
    window.dispatchEvent(new Event("popstate"));
  }, []);

  const removeQueryParam = useCallback((key: string) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    
    // Update URL without page reload
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.pushState({}, "", newUrl);
    
    // Trigger popstate to update components
    window.dispatchEvent(new Event("popstate"));
  }, []);

  return { getQueryParam, setQueryParam, removeQueryParam };
};

export default useQueryParams;
