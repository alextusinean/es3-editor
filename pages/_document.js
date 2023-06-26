import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* please remove/change these two scripts if you're launching your own instance */}
          <Script strategy='beforeInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-X7X0P5WB4F' />
          <Script id='google-analytics-initialize' strategy='beforeInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-X7X0P5WB4F');
            `}
          </Script>
        </Head>
        <body>
          <ColorModeScript initialColorMode='dark' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
