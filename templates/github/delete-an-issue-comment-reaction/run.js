/**
 * ----------------------------------------------------------------------------------------------------
 * Delete an Issue Comment Reaction [Run]
 *
 * @description - Delete an Issue Comment Reaction using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/reactions#delete-an-issue-comment-reaction
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, owner, repo, comment_id, reaction_id } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "delete",
      url: `https://api.github.com/repos/${owner}/${repo}/issues/comments/${comment_id}/reactions/${reaction_id}`,
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
const verifyInput = ({ owner, repo, comment_id, reaction_id }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_COMMENT_ID: "A valid comment_id field (number) was not provided in the input.",
    INVALID_REACTION_ID: "A valid reaction_id field (number) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof comment_id !== "number") throw new Error(ERRORS.INVALID_COMMENT_ID);
  if (typeof reaction_id !== "number") throw new Error(ERRORS.INVALID_REACTION_ID);
};
