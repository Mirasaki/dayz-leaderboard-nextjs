import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

// https://www.metatags.org/all-meta-tags-overview/
// https://www.reddit.com/r/discordapp/comments/82p8i6/a_basic_tutorial_on_how_to_get_the_most_out_of/

function SEO ({ description, title, subTitle, imageURL, favicon, largeImg, color }) {
  const resolvedTitle = subTitle ? `${title} | ${subTitle}` : title;

  return (
    <Head>
      {favicon && <link rel="icon" href={favicon} />}
      {title && <title>{resolvedTitle}</title>}
      {color && <meta name="theme-color" content={color} />}
      {description && <meta
        name="description"
        content={description}
        key="desc"
      />}

      {/* Open Graph Protocol */}
      <meta property="og:type" content="website" />
      {title && <meta property="og:title" content={resolvedTitle} />}
      {description && <meta property="og:description" content={description} />}
      {imageURL && <meta property="og:image" content={imageURL} />}

      {/* Twitter tags */}
      {largeImg
        ? <meta name="twitter:card" content="summary_large_image" />
        : <meta property="twitter:card" content="summary" />
      }
      {title && <meta property="twitter:title" content={resolvedTitle} />}
      {description && <meta property="twitter:description" content={description} />}
    </Head>
  );
}

SEO.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  imageURL: PropTypes.string,
  favicon: PropTypes.string,
  largeImg: PropTypes.bool,
  color: PropTypes.string
};


export default SEO;
