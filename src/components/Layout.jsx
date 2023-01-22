import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './Navbar';
import BackgroundImage from './BackgroundImage';
import styles from '../styles/Layout.module.css';
import Footer from './Footer';

export default function Layout ({ children }) {
  // Return the final component
  return (
    <>
      {/* Render our full-screen background image */}
      <BackgroundImage />

      {/* zIndex is always on top of background which is 0 */}
      <div className={styles.pageWrapper} style={{ zIndex: 1 }}>
        {/* Navbar / Header */}
        <NavBar />

        {/* Page content */}
        <div className={styles.mainContentSpacer}>
          {children}
        </div>

        {/* Branding Footer */}
        <Footer />
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.object
};
