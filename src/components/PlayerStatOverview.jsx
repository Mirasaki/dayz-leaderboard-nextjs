import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../styles/Leaderboard.module.css';

const PlayerStatOverview = ({ stats }) => {
  const deaths = (typeof stats.deaths === 'object' ? stats.deaths.other : stats.deaths) ?? 0;
  const kdratio = stats.kdratio ?? stats.killDeathRatio;
  const suicides = stats.suicides ?? stats.deaths?.suicides ?? 0;
  return (
    <Container>
      <Row>
        <Col>
          <i className="fa fa-crosshairs" aria-hidden="true" style={{ color: 'red' }}/> {stats.kills || 0} Kills
        </Col>
        <Col>
          🪦 {deaths} Deaths
        </Col>
        <Col>
          ➗ {kdratio} KDR
        </Col>
      </Row>
      <Row>
        <Col>
          <i className="fa fa-bullseye" aria-hidden="true" style={{ color: 'red' }}/> {stats.hits || 0} Hits
        </Col>
        <Col>
          <i className="fa fa-bullseye" aria-hidden="true" style={{ color: 'red' }}/> Longest Kill: {stats.longestKill || 0}m
        </Col>
        <Col>
          <i className="fa fa-bullseye" aria-hidden="true" style={{ color: 'red' }}/> Longest Shot: {stats.longestShot || 0}m
        </Col>
      </Row>
      <Row style={{
        fontSize: '90%',
        padding: '1em 0'
      }}>
        <Col>
          🪦 {suicides} Suicides
        </Col>
      </Row>
      <Row style={{
        marginTop: '-.7em'
      }}>
        <Col>
          <i className="fa fa-clock-o" aria-hidden="true" style={{ color: 'green' }}/> Playtime: {Number(stats.playtime / 60 / 60).toFixed(2) || 0} Hours
        </Col>
      </Row>
    </Container>
  );
};

PlayerStatOverview.propTypes = {
  stats: PropTypes.object
};

export default PlayerStatOverview;

