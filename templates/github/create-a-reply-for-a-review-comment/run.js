/**
 * ----------------------------------------------------------------------------------------------------
 * Create a Reply for a Review Comment [Run]
 *
 * @description - Create a Reply for a Review Comment using the GitHub API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://docs.github.com/enterprise-server@3.3/rest/reference/pulls#create-a-reply-for-a-review-comment
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
  const { GITHUB_API_USERNAME, GITHUB_API_TOKEN, owner, repo, pull_number, comment_id, body } =
    input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/comments/${comment_id}/replies`,
      auth: { username: GITHUB_API_USERNAME, password: GITHUB_API_TOKEN },
      headers: { accept: "application/vnd.github.v3+json" },
      params: {},
      data: { body },
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
const verifyInput = ({ owner, repo, pull_number, comment_id, body }) => {
  const ERRORS = {
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_PULL_NUMBER: "A valid pull_number field (number) was not provided in the input.",
    INVALID_COMMENT_ID: "A valid comment_id field (number) was not provided in the input.",
    INVALID_BODY: "A valid body field (string) was not provided in the input.",
  };

  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof pull_number !== "number") throw new Error(ERRORS.INVALID_PULL_NUMBER);
  if (typeof comment_id !== "number") throw new Error(ERRORS.INVALID_COMMENT_ID);
  if (typeof body !== "string") throw new Error(ERRORS.INVALID_BODY);
};
