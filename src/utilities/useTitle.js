import { useEffect } from 'react';

const useTitle = () => {
  useEffect(() => {
    const handleRouteChange = () => {
      const { pathname } = window.location;
      const route = pathname.substring(1); // Remove the leading '/'

      document.title = `Instrumental Learning Academy | ${route.charAt(0).toUpperCase() + route.slice(1)}`;
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);

    // Update the title on initial load
    handleRouteChange();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
};

export default useTitle;