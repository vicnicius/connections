/**
 * ----------------------------------------------------------------------------------------------------
 * Update a Webhook Configuration for an App [Run]
 *
 * @description - Update a Webhook Configuration for an App using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/apps#update-a-webhook-configuration-for-an-app
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, url, content_type, secret, insecure_ssl } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "patch",
      url: "https://api.github.com/app/hook/config",
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: {
        ...(url ? { url } : {}),
        ...(content_type ? { content_type } : {}),
        ...(secret ? { secret } : {}),
        ...(insecure_ssl ? { insecure_ssl } : {}),
      },
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
const verifyInput = () => {
  const ERRORS = {};
};
