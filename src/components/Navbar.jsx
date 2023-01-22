import Image from 'next/image';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import styles from '../styles/Navbar.module.css';
import config from '../../config.json';

const NavBar = () => {
  useEffect(() => {
    // Check if scroll indicator is disabled
    if (config.USE_SCROLL_INDICATOR) {
      // When the user scrolls the page, execute myFunction
      window.onscroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-tracker').style.width = scrolled + '%';
      };
    }
  });

  return (
    <>
      <Navbar
        sticky="top"
        variant="dark"
        className={styles.navbar}
        style={{
          backgroundColor: config.NAVBAR_BACKGROUND_COLOR,
          borderBottom: `2px solid ${config.SCROLL_INDICATOR_BACKGROUND_COLOR}`
        }}
      >
        <Container className={styles.navContainer}>
          <Navbar.Brand href="/">
            <Image
              alt="logo"
              src={`/${config.BRANDING_LOGO_FILE_NAME}`}
              width="75"
              height="75"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button
              className={styles.discordButton}
              variant="outline-primary"
              href={config.COMMUNITY_BUTTON_INVITE_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              {config.COMMUNITY_BUTTON_USE_DISCORD_LOGO && <Image
                alt="discord-logo"
                src='/discord-logo-white.svg'
                width='30'
                height='30'
                style={{ marginRight: '.4em' }}
              />}
              {' '}{config.COMMUNITY_BUTTON_TEXT}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Scroll Indicator Vertical Bar */}
      <div
        id="scroll-tracker"
        className={styles.scrollTracker}
        style={{
          backgroundColor: config.SCROLL_INDICATOR_COLOR,
          visibility: config.USE_SCROLL_INDICATOR ? 'visible': 'hidden'
        }}
      />
    </>
  );
};

export default NavBar;
