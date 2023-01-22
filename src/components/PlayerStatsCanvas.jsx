import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';

import LeaderboardAccordion from './LeaderboardAccordion';
import WeaponTable from './tables/WeaponTable';

// [DEV] - TODO: Global hit-zones and weapon hit-zones

const PlayerStatsCanvas = ({
  stats,
  showPlayerDetails,
  handleClosePlayerDetails
}) => {
  // Resolve newest player name
  const activePlayerName = stats?.names?.length >= 1
    ? stats.names[stats.names.length - 1] // JS 0-index offset
    : 'Unknown';

  const { statistics } = stats;
  const weaponsBreakdown = statistics.weaponsBreakdown || undefined;

  // Full missing leaderboard request data
  statistics.name = activePlayerName;
  statistics.id = `${statistics.id}-offCanvas`; // Overwrite id to avoid unique map key issues

  return (
    <Offcanvas
      // Disable parent scrolling
      scroll={false}
      show={showPlayerDetails}
      onHide={handleClosePlayerDetails}
      placement='top'
      name='player-stats'
      style={{
        zIndex: 9001, // Offcanvas, 1 above scroll-tracker
        background: '#121212',
        borderBottom: '2px solid white',
        '--bs-offcanvas-height': 'calc(100vh - 1px)', // Weird transparency bug if 100vh
        overflowY: 'scroll',
        color: 'white'
      }}
    >
      <Container fluid>
        <Offcanvas.Header>
          <Offcanvas.Title>Survivor: {activePlayerName}</Offcanvas.Title>
          <Button
            onClick={handleClosePlayerDetails}
            variant='outline-light'
            style={{
              display: 'flex',
              border: '1px solid rgba(255,255,255,.5)'
            }}
          >
            <i className="fa fa-times" aria-hidden="true" />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '1em 0'
        }}>
          <Container>

            {/* Base Stats / Fake leaderboard */}
            <h3 className="pb-2 border-bottom" style={{ paddingTop: '.2em' }}>Personal Stats</h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '.5em 0 1em'
            }}>
              <LeaderboardAccordion data={[statistics]}/>
            </div>

            {/* History of previous names */}
            {stats.names.length > 2 && <div style={{ paddingTop: '1.5em' }}>
              <h3 className="pb-2 border-bottom">This player is also known as:</h3>
              <ul>
                {stats.names.slice(1, stats.names.length - 1).map((name) => <li key={name}>{name}</li>)}
              </ul>
            </div>}


            {/* Weapons Overview Table */}
            {Object.entries(weaponsBreakdown) && <div>
              <h3 className="pb-2 border-bottom">Favorite Weapons:</h3>
              <Container  fluid style={{
                overflowX: 'auto',
                paddingLeft: 0,
                paddingRight: '0em'
              }}>

                <WeaponTable
                  name={activePlayerName}
                  data={Object.entries(weaponsBreakdown)
                  // Default sort is damage
                    .sort(([classA, weaponA], [classB, weaponB]) => weaponB.damage - weaponA.damage)
                    .map(([className, weapon]) => {
                      const weaponDmg = weapon.damage || 0;
                      const weaponHits = weapon.hits || 0;
                      const dividesZeroByZero = weaponDmg === weaponHits && weaponHits === 0; // Dividing 0 by 0 = isNaN
                      const dmgPerHit = dividesZeroByZero ? 0 : Number(weaponDmg / weaponHits).toFixed(2);

                      return {
                        ...weapon,
                        name: className, // Append name property
                        dmgPerHit // Define dmgPerHit property
                      };
                    }) // transform into array of objects instead of key-value list
                  }
                />
              </Container>
            </div>}

          </Container>
        </Offcanvas.Body>
      </Container>
    </Offcanvas>
  );
};


PlayerStatsCanvas.propTypes = {
  stats: PropTypes.object,
  showPlayerDetails: PropTypes.bool,
  handleClosePlayerDetails: PropTypes.func
};

export default PlayerStatsCanvas;
