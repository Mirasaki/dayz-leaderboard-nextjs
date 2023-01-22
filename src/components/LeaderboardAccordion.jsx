import Accordion from 'react-bootstrap/Accordion';

import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Leaderboard.module.css';
import styles from '../styles/Leaderboard.module.css';
import PlayerStatOverview from './PlayerStatOverview';

const LeaderboardAccordion = ({ data }) => {
  return (
    <Accordion flush alwaysOpen
      className={styles.accordion}
      defaultActiveKey={[data && data[0] ? data[0].id : '0']}
      color="black"
    >
      {data?.map((stats) => {
        const nameRankId = (stats.rank ? `${stats.rank} | ${stats.name}` : stats.name)
          // Replace repeating spaces by single space
          .replace(/\s\s+/g, ' ');
        return <Accordion.Item
          className={styles.accordionItem}
          key={stats.id}
          eventKey={stats.id}
        >
          <Accordion.Header className={styles.accordionHeader}>
            {nameRankId}
          </Accordion.Header>
          <Accordion.Body className={styles.accordionBody}>
            <hr />
            <PlayerStatOverview stats={stats}/>
          </Accordion.Body>
        </Accordion.Item>;
      })}
    </Accordion>
  );
};

LeaderboardAccordion.propTypes = {
  data: PropTypes.array
};

export default LeaderboardAccordion;
