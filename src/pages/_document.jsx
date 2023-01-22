import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import config from '../../config.json';

function Document () {
  return (
    <Html>
      <Head>
        {/* <!-- Font Awesome CDN --> */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <body style={{ backgroundColor: config.DEFAULT_BACKGROUND_COLOR }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
