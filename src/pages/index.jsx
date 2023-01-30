// Import from NextJS
import Link from 'next/link';
import { useRouter } from 'next/router';

// Import for react-bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

// Import from other packages
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CFToolsId, ServerApiId, Statistic, SteamId64 } from 'cftools-sdk';

// Import from components
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import MouseOverTooltip from '../components/MouseOverTooltip';
import PlayerStatsCanvas from '../components/PlayerStatsCanvas';
import LeaderboardAccordion from '../components/LeaderboardAccordion';

// Import from local files
import config from '../../config.json';
import styles from '../styles/Home.module.css';
import { titleCase } from '../helpers/util';
import backendCftClient, { fetchAppGrants } from '../helpers/cftClient';

// Destructure from our user configuration file
const {
  BRANDING_BORDER_COLOR,
  LEADERBOARD_DEFAULT_SORT_VALUE,
  LEADERBOARD_ALLOWED_SORT_VALUES,
  USE_MULTIPLE_SERVER_CONFIGURATION,
  BRANDING_TEXT_LEADERBOARD_COLOR,
  BRANDING_URL,
  BRANDING_TEXT_BRAND_COLOR,
  BRANDING_NAME,
  AUTOMATICALLY_RESOLVE_SERVER_GRANTS,
  CFTOOLS_DAYZ_SERVERS,
  BLACKLISTED_CFTOOLS_IDS,
  ALLOW_PLAYER_STATISTICS_FOR_BLACKLIST
} = config;

/*
  Validate that we have all specified entries
  This is done for users updating to a new release,
  which doesn't overwrite their config.json file as this
  is included in the .gitignore file
*/
for (const [k, v] of Object.entries({
  BRANDING_BORDER_COLOR,
  LEADERBOARD_DEFAULT_SORT_VALUE,
  LEADERBOARD_ALLOWED_SORT_VALUES,
  USE_MULTIPLE_SERVER_CONFIGURATION,
  BRANDING_TEXT_LEADERBOARD_COLOR,
  BRANDING_URL,
  BRANDING_TEXT_BRAND_COLOR,
  BRANDING_NAME,
  AUTOMATICALLY_RESOLVE_SERVER_GRANTS,
  CFTOOLS_DAYZ_SERVERS,
  BLACKLISTED_CFTOOLS_IDS,
  ALLOW_PLAYER_STATISTICS_FOR_BLACKLIST
})) if (typeof v === 'undefined') console.error(`Missing required property "${k}" in \`/config.json\` file`);

// Create text backdrop style for main branding
const BRANDING_BORDER = `1px 0px 4px ${BRANDING_BORDER_COLOR},
-1px 0px 4px ${BRANDING_BORDER_COLOR},
0px 1px 4px ${BRANDING_BORDER_COLOR},
0px -1px 4px ${BRANDING_BORDER_COLOR}
`;

export default function Home ({ leaderboard, stats, grants }) {
  const router = useRouter();
  const [player, setPlayer] = useState('');

  // Sorting state management
  const [sortBy, setSortBy] = useState(LEADERBOARD_DEFAULT_SORT_VALUE);
  const handleUpdateSortBy = (sortValue) => {
    if (!LEADERBOARD_ALLOWED_SORT_VALUES.includes(sortValue)) return;
    setSortBy(sortValue);
    router.query.sort = sortValue;

    // Resolve the new route
    const searchParams = new URLSearchParams();
    searchParams.append('sort', router.query.sort);
    if (router.query.server) {
      searchParams.append('server', router.query.server);
    }

    router.push(`${router.basePath}?${searchParams.toString()}`);
  };

  // Select server state management
  const [selectServer, setSelectServer] = useState(
    // Resolve default server name
    USE_MULTIPLE_SERVER_CONFIGURATION
      ? (grants && grants[0] ? grants[0].name : '')
      : ''
  );
  const handleUpdateSelectServer = (serverName) => {
    setSelectServer(serverName);
    router.query.server = serverName;

    // Resolve the new route
    const searchParams = new URLSearchParams();
    if (router.query.sort) {
      searchParams.append('sort', router.query.sort);
    }
    searchParams.append('server', serverName);

    router.push(`${router.basePath}?${searchParams.toString()}`);
  };

  // Player details state management
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const handleShowPlayerDetails = () => setShowPlayerDetails(true);
  const handleClosePlayerDetails = () => {
    setShowPlayerDetails(false);
    setPlayer('');
    const {
      sort,
      server // ignore player
    } = router.query;
    const searchParams = new URLSearchParams();
    if (sort && LEADERBOARD_ALLOWED_SORT_VALUES.includes(sort)) searchParams.append('sort', sort);
    if (server) searchParams.append('server', server);
    router.push(`${router.basePath}?${searchParams.toString()}`);
  };

  // Hydration and prevent re-render loop
  useEffect(() => {
    // If player stats are retrieves, display the overview
    if (stats) handleShowPlayerDetails();

    // Apply to state from url params on hard-refresh
    const { sort, server } = router.query;
    if (sort) {
      if (LEADERBOARD_ALLOWED_SORT_VALUES.includes(sort)) setSortBy(sort);
      else setSortBy(LEADERBOARD_DEFAULT_SORT_VALUE);
    }

    if (server) {
      if (grants?.find(({ name }) => name === server)) {
        setSelectServer(server);
      }
      else setSelectServer((grants && grants[0]) ? grants[0].name : '');
    }
  }, [stats, router.query, grants]);

  // Query for in-game name
  if (player) leaderboard = leaderboard
    .filter((stats) => stats.name.toLowerCase().indexOf(player.toLowerCase()) >= 0);

  // Prepare missing value for player details overview
  if (stats) stats.statistics.playtime = stats.playtime;

  // Return the final component
  return (<>
    {/* SEO / Social */}
    <SEO
      subTitle={'DayZ Leaderboard'}
    />

    <Layout>
      <Container>
        {/* Separate main tag to define main page content */}
        <main className={styles.main}>
          {/* Page Title */}
          <h1 className={styles.title} style={{
            textShadow: BRANDING_BORDER,
            color: BRANDING_TEXT_LEADERBOARD_COLOR
          }}>
            <Link
              href={BRANDING_URL || '/'}
              style={{ color: BRANDING_TEXT_BRAND_COLOR }}
            >
              {BRANDING_NAME}
            </Link> Leaderboard
          </h1>

          {/* Steam64/In-Game-Name Input */}
          <Form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form-submit
              if (
                !player // Return if empty text input
                && leaderboard.length !== 1 // But continue if there's only 1 player showing
                // to enable go button on low data population
              ) return;

              // Resolve final survivor listed id
              const searchParams = new URLSearchParams();
              if (router.query.sort) searchParams.append('sort', router.query.sort);
              if (router.query.server) searchParams.append('server', router.query.server);

              searchParams.append(
                'player',
                leaderboard.length === 1
                  ? leaderboard[0].id
                  : player
              );

              router.push(`${router.basePath}?${searchParams.toString()}`);
            }}
          >
            {/* Info tooltip */}
            <MouseOverTooltip tooltip={<p>
              Filter by in-game name, or type your Steam64/CFTools ID and hit go/enter!
              <br />
              <br />
              If only 1 survivor is shown, clicking go/enter will automatically retrieve player stats for that specific player.
            </p>}>
              <i className='fa fa-question-circle' />
            </MouseOverTooltip>
            {/* Text Input */}
            <Form.Control
              type="text"
              value={player}
              placeholder="Enter your Steam64"
              onChange={(e) => setPlayer(e.target.value)}
            />
            {/* Submit button */}
            <Button
              variant='success'
              type="submit"
              style={{ marginLeft: '.3em' }}
            >Go</Button>
          </Form>

          {/* Select Server Dropdown */}
          {USE_MULTIPLE_SERVER_CONFIGURATION && <Dropdown
            className={styles.dropdown}
            style={{ marginBottom: '.2rem' }}
          >
            <Dropdown.Toggle
              variant="outline-light"
              id="select-server-dropdown"
              className={styles.dropdownToggle}
            >
              Server: {selectServer}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {AUTOMATICALLY_RESOLVE_SERVER_GRANTS
                ? grants?.map((serverCfg) => {
                  return (<Dropdown.Item
                    key={serverCfg.name}
                    onClick={() => handleUpdateSelectServer(serverCfg.name)}
                  >{serverCfg.name}</Dropdown.Item>);
                })
                : CFTOOLS_DAYZ_SERVERS.map((serverCfg) => {
                  return (<Dropdown.Item
                    key={serverCfg.NAME}
                    onClick={() => handleUpdateSelectServer(serverCfg.NAME)}
                  >{serverCfg.NAME}</Dropdown.Item>);
                })
              }
            </Dropdown.Menu>
          </Dropdown>}

          {/* Select sort by */}
          <Dropdown className={styles.dropdown} style={{ marginBottom: '2rem' }}>
            <Dropdown.Toggle
              variant="outline-light"
              id="select-sort-dropdown"
              className={styles.dropdownToggle}
            >
              Sort by: {titleCase(sortBy.replace(/[-_]/g, ' '))}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {LEADERBOARD_ALLOWED_SORT_VALUES.map((sortValue) => {
                return (<Dropdown.Item
                  key={sortValue}
                  onClick={() => handleUpdateSortBy(sortValue)}
                >
                  {titleCase(sortValue.replace(/[_-]/g, ' '))}
                </Dropdown.Item>);
              })}
            </Dropdown.Menu>
          </Dropdown>

          {/* Player Stats */}
          {stats && <PlayerStatsCanvas
            stats={stats}
            showPlayerDetails={showPlayerDetails}
            handleClosePlayerDetails={handleClosePlayerDetails}
          />}

          {/* And finally, the leaderboard */}
          <LeaderboardAccordion data={leaderboard} />
        </main>
      </Container>
    </Layout>
  </>);
}

Home.propTypes = {
  leaderboard: PropTypes.array,
  stats: PropTypes.object,
  grants: PropTypes.array
};

const steamRegex = /^[0-9]{17}$/g;
const cftoolsIdRegex = /^[0-9a-zA-Z]{24}$/g;
export async function getServerSideProps ({ query }) {
  // Default sort
  let statistic = Statistic.KILLS;

  // Set sort key, if valid string provided
  if (query.sort && LEADERBOARD_ALLOWED_SORT_VALUES.includes(query.sort)) {
    statistic = query.sort;
  }

  // resolve the serverApiID - Defaults to process.env
  let serverApiId = new ServerApiId(process.env.CFTOOLS_SERVER_API_ID);
  let appGrants;
  if (USE_MULTIPLE_SERVER_CONFIGURATION) {
    const appGrantRes = await fetchAppGrants();
    const grants = appGrantRes.tokens?.server;

    // Hit the CFTools grants endpoint to resolve servers
    if (AUTOMATICALLY_RESOLVE_SERVER_GRANTS) {
      // Serialize grants for front end
      if (grants) {
        appGrants = grants.map((cfg) => {
          return ({
            name: cfg.resource?.identifier,
            id: cfg.resource?.id
          });
        });
      }
    }

    // Manual grant set-up
    else {
      appGrants = CFTOOLS_DAYZ_SERVERS.map(({ NAME, SERVER_API_ID }) => ({
        name: NAME,
        id: SERVER_API_ID
      }));
    }

    // Resolve user query
    if (appGrants && query.server) {
      const targetServer = appGrants.find(({ name }) => name === query.server);
      if (targetServer) serverApiId = new ServerApiId(targetServer.id);
    }

    // Resolve server select option
    const serverCfg = CFTOOLS_DAYZ_SERVERS.find(({ NAME }) => NAME === query.server);
    if (serverCfg) serverApiId = new ServerApiId(serverCfg.SERVER_API_ID);
  }

  // Resolve UID and fetch player stats
  let stats = null;
  if (query.player) {
    const isSteam64Query = query.player.match(steamRegex);
    const isCftoolsIdQuery = query.player.match(cftoolsIdRegex);
    try {
      if (isSteam64Query) {
        stats = await backendCftClient.getPlayerDetails({
          playerId: new SteamId64(query.player),
          serverApiId
        });
      }
      else if (isCftoolsIdQuery) {
        stats = await backendCftClient.getPlayerDetails({
          playerId: new CFToolsId(query.player),
          serverApiId
        });
      }
    } catch {
      // No need to do anything, stats is null by default - gets handled client-side
    }
  }

  // Only allow data that can be JSON serialized
  // Fetch data from external API
  // Don't try/catch so users see when they enter wrong credentials
  let res = await backendCftClient.getLeaderboard({
    order: 'ASC',
    statistic,
    limit: 100,
    serverApiId
  });
  res = res.map((stats) => {
    // Fix nested id, nested object cant be serialized
    if (stats.id.id) stats.id = stats.id.id;

    // Replace undefined with null
    for (const key in stats) {
      if (stats[key] === undefined) stats[key] = null;
    }
    return stats;
  });

  // Filter out blacklisted entries
  // IF a valid config is provided
  if (
    BLACKLISTED_CFTOOLS_IDS
    && Array.isArray(BLACKLISTED_CFTOOLS_IDS)
    && BLACKLISTED_CFTOOLS_IDS[0]
  ) {
    // Filter out blacklisted id's
    const filteredRes = res.filter(({ id }) => !BLACKLISTED_CFTOOLS_IDS.includes(id));

    // If the length of the array has changed, process new ranks
    if (res.length !== filteredRes.length) {
      res = filteredRes.map((stats, index) => ({
        ...stats,
        rank: index + 1
      }));
    }

    // If player statistics are queried, make the
    // data unavailable if blacklisted and requested
    if (
      ( stats && ALLOW_PLAYER_STATISTICS_FOR_BLACKLIST === false )
      && (
        // Blacklist steam 64 - This is just a backup in case someone
        // provides a player to the blacklist, downside is that
        // we can't hide them from the global leaderboard if we do
        BLACKLISTED_CFTOOLS_IDS.includes(query.player)
        // Blacklist cftools id
        || BLACKLISTED_CFTOOLS_IDS.includes(stats.id)
      )
    ) stats = null;
  }

  // Pass data to the page via props
  return { props: { leaderboard: res, stats, grants: appGrants || null } };
}
