/**
 * ----------------------------------------------------------------------------------------------------
 * Ping a Global Webhook [Run]
 *
 * @description - Ping a Global Webhook using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/enterprise-admin#ping-a-global-webhook
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, accept, hook_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/admin/hooks/${hook_id}/pings`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: {
        accept: "application/vnd.github.superpro-preview+json",
        accept: "application/vnd.github.v3+json",
      },
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
const verifyInput = ({ accept, hook_id }) => {
  const ERRORS = {
    INVALID_ACCEPT: "A valid accept field (string) was not provided in the input.",
    INVALID_HOOK_ID: "A valid hook_id field (number) was not provided in the input.",
  };

  if (typeof accept !== "string") throw new Error(ERRORS.INVALID_ACCEPT);
  if (typeof hook_id !== "number") throw new Error(ERRORS.INVALID_HOOK_ID);
};
