/**
 * ----------------------------------------------------------------------------------------------------
 * Sync LDAP Mapping for a Team [Run]
 *
 * @description - Sync LDAP Mapping for a Team using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#sync-ldap-mapping-for-a-team
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, team_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/admin/ldap/teams/${team_id}/sync`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ team_id }) => {
  const ERRORS = {
    INVALID_TEAM_ID: "A valid team_id field (number) was not provided in the input.",
  };

  if (typeof team_id !== "number") throw new Error(ERRORS.INVALID_TEAM_ID);
};
