// Destructure our environmental variables
const {
  CFTOOLS_SERVER_API_ID,
  CFTOOLS_API_SECRET,
  CFTOOLS_API_APPLICATION_ID
} = process.env;

const cftSDK = require('cftools-sdk');
export default new cftSDK.CFToolsClientBuilder()
  .withCache()
  .withServerApiId(CFTOOLS_SERVER_API_ID)
  .withCredentials(CFTOOLS_API_APPLICATION_ID, CFTOOLS_API_SECRET)
  .build();

// Get API token, valid for 24 hours, dont export function
const fetchAPIToken = async () => {
  // Getting our token
  let token = await fetch(
    'https://data.cftools.cloud/v1/auth/register',
    {
      method: 'POST',
      body: JSON.stringify({
        'application_id': CFTOOLS_API_APPLICATION_ID,
        secret: CFTOOLS_API_SECRET
      }),
      headers: { 'Content-Type': 'application/json' }
    }
  );
  token = (await token.json()).token;
  return token;
};

let CFTOOLS_API_TOKEN;
const tokenExpirationMS = 1000 * 60 * 60 * 23;
const getAPIToken = async () => {
  if (!CFTOOLS_API_TOKEN) {
    CFTOOLS_API_TOKEN = await fetchAPIToken();
    // Update our token every 23 hours
    setInterval(async () => {
      CFTOOLS_API_TOKEN = await fetchAPIToken();
    }, tokenExpirationMS);
  }
  return CFTOOLS_API_TOKEN;
};

let grants = null;
const fetchAppGrants = async () => {
  // Return cached grants
  if (grants) return grants;

  let data;
  try {
    // Fetch from API
    data = await fetch(
      'https://data.cftools.cloud/v1/@app/grants',
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${await getAPIToken()}` }
      }
    );


    // Serialize, set in cache and schedule clear cache
    data = (await data.json());
    grants = data;
    setTimeout(() => grants = null, 1000 * 60 * 5);

    // Return API data
    return data;
  } catch (err) {
    console.log('Error encounter while fetching app grants');
    console.error(err);
    return err;
  }
};

export {
  fetchAppGrants
};
