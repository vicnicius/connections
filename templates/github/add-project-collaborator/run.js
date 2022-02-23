/**
 * ----------------------------------------------------------------------------------------------------
 * Add Project Collaborator [Run]
 *
 * @description - Add Project Collaborator using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/projects#add-project-collaborator
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, project_id, username, permission } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.github.com/projects/${project_id}/collaborators/${username}`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { ...(permission ? { permission } : {}) },
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
const verifyInput = ({ project_id, username }) => {
  const ERRORS = {
    INVALID_PROJECT_ID: "A valid project_id field (number) was not provided in the input.",
    INVALID_USERNAME: "A valid username field (string) was not provided in the input.",
  };

  if (typeof project_id !== "number") throw new Error(ERRORS.INVALID_PROJECT_ID);
  if (typeof username !== "string") throw new Error(ERRORS.INVALID_USERNAME);
};
