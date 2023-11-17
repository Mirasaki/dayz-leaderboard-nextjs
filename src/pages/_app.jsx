import React from 'react';
import PropTypes from 'prop-types';

// Styles / CSS
import '../styles/globals.css'; // Our global stylesheet
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap css

import SEO from '../components/SEO';
import config from '../../config.json';

function MyApp ({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (<>
    {/* Default Search Engine Optimization */}
    <SEO
      title={config.PAGE_TITLE}
      subTitle={config.PAGE_SUB_TITLE}
      description={config.PAGE_DESCRIPTION}
      imageURL={process.env.NEXT_PUBLIC_IMAGE_URL || `/${config.BRANDING_LOGO_FILE_NAME}`}
      favicon={config.BRANDING_LOGO_FILE_NAME}
      largeImg={process.env.NEXT_PUBLIC_LARGE_OG_IMAGE === 'true'}
      color={config.BRANDING_THEME_COLOR}
    />
    <Component {...pageProps} />
  </>);
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};


export default MyApp;
