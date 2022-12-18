import { ChakraProvider } from '@chakra-ui/react';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      {/* please remove/change these two scripts if you're launching your own instance */}
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-X7X0P5WB4F' />
      <Script id='google-analytics-initialize' strategy='lazyOnload'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'G-X7X0P5WB4F');
        `}
      </Script>
      
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
