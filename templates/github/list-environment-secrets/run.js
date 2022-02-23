/**
 * ----------------------------------------------------------------------------------------------------
 * List Environment Secrets [Run]
 *
 * @description - List Environment Secrets using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/actions#list-environment-secrets
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, repository_id, environment_name, per_page, page } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.github.com/repositories/${repository_id}/environments/${environment_name}/secrets`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: { ...(per_page ? { per_page } : {}), ...(page ? { page } : {}) },
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
const verifyInput = ({ repository_id, environment_name }) => {
  const ERRORS = {
    INVALID_REPOSITORY_ID: "A valid repository_id field (number) was not provided in the input.",
    INVALID_ENVIRONMENT_NAME:
      "A valid environment_name field (string) was not provided in the input.",
  };

  if (typeof repository_id !== "number") throw new Error(ERRORS.INVALID_REPOSITORY_ID);
  if (typeof environment_name !== "string") throw new Error(ERRORS.INVALID_ENVIRONMENT_NAME);
};
