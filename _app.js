import { useEffect } from 'react';
import '../styles/globals.css';
import { ShadcnProvider } from '@shadcn/ui';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // You can add global JS functionality here
  }, []);

  return (
    <ShadcnProvider>
      <Component {...pageProps} />
    </ShadcnProvider>
  );
}

export default MyApp;
