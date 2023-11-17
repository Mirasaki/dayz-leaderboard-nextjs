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
