import React from 'react';
import Row from 'react-bootstrap/Row';
import config from '../../config.json';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Row>
        <a
          href={config.BRANDING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {new Date().getUTCFullYear()} &#169; {config.BRANDING_NAME}
        </a>
      </Row>
      <Row>
        {/*
          Bruh =(
          Why would you remove this?
          It's a free, open-source tool - leave credit where credit is due
          Nothing is stopping you from doing so - though
          Just your own conscious, hopefully
        */}
        <a
          href="https://mirasaki.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by Mirasaki
        </a>
      </Row>
    </footer>
  );
};

export default Footer;
