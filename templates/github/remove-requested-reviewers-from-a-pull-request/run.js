/**
 * ----------------------------------------------------------------------------------------------------
 * Remove Requested Reviewers From a Pull Request [Run]
 *
 * @description - Remove Requested Reviewers From a Pull Request using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/pulls#remove-requested-reviewers-from-a-pull-request
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
  const {
    GITHUB_API_USERNAME,
    GITHUB_API_TOKEN,
    owner,
    repo,
    pull_number,
    reviewers,
    team_reviewers,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "delete",
      url: `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/requested_reviewers`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { reviewers, ...(team_reviewers ? { team_reviewers } : {}) },
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
const verifyInput = ({ owner, repo, pull_number, reviewers }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_PULL_NUMBER: "A valid pull_number field (number) was not provided in the input.",
    INVALID_REVIEWERS: "A valid reviewers field (object) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof pull_number !== "number") throw new Error(ERRORS.INVALID_PULL_NUMBER);
  if (typeof reviewers !== "object") throw new Error(ERRORS.INVALID_REVIEWERS);
};
