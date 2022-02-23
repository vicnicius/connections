/**
 * ----------------------------------------------------------------------------------------------------
 * Create Reaction for a Team Discussion [Run]
 *
 * @description - Create Reaction for a Team Discussion using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/reactions#create-reaction-for-a-team-discussion
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, org, team_slug, discussion_number, content } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/orgs/${org}/teams/${team_slug}/discussions/${discussion_number}/reactions`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { content },
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
const verifyInput = ({ org, team_slug, discussion_number, content }) => {
  const ERRORS = {
    INVALID_ORG: "A valid org field (string) was not provided in the input.",
    INVALID_TEAM_SLUG: "A valid team_slug field (string) was not provided in the input.",
    INVALID_DISCUSSION_NUMBER:
      "A valid discussion_number field (number) was not provided in the input.",
    INVALID_CONTENT: "A valid content field (string) was not provided in the input.",
  };

  if (typeof org !== "string") throw new Error(ERRORS.INVALID_ORG);
  if (typeof team_slug !== "string") throw new Error(ERRORS.INVALID_TEAM_SLUG);
  if (typeof discussion_number !== "number") throw new Error(ERRORS.INVALID_DISCUSSION_NUMBER);
  if (typeof content !== "string") throw new Error(ERRORS.INVALID_CONTENT);
};
