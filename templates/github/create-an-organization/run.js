/**
 * ----------------------------------------------------------------------------------------------------
 * Create an Organization [Run]
 *
 * @description - Create an Organization using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#create-an-organization
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, login, admin, profile_name } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.github.com/admin/organizations",
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { admin, login, ...(profile_name ? { profile_name } : {}) },
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
const verifyInput = ({ admin, login }) => {
  const ERRORS = {
    INVALID_ADMIN: "A valid admin field (string) was not provided in the input.",
    INVALID_LOGIN: "A valid login field (string) was not provided in the input.",
  };

  if (typeof admin !== "string") throw new Error(ERRORS.INVALID_ADMIN);
  if (typeof login !== "string") throw new Error(ERRORS.INVALID_LOGIN);
};
