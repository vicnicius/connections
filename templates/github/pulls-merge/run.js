const axios = require("axios");

const run = async (input) => {
  const {
    BUILDABLE_GITHUB_ACCESS_TOKEN,
    BUILDABLE_GITHUB_ACCOUNT_ID,
    owner,
    repo,
    pull_number,
    commit_title,
    commit_message,
    sha,
    merge_method,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "put",
      url: `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/merge`,
      auth: { password: BUILDABLE_GITHUB_ACCESS_TOKEN, username: BUILDABLE_GITHUB_ACCOUNT_ID },
      data: {
        ...(commit_title ? { commit_title } : {}),
        ...(commit_message ? { commit_message } : {}),
        ...(sha ? { sha } : {}),
        ...(merge_method ? { merge_method } : {}),
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
const verifyInput = ({
  BUILDABLE_GITHUB_ACCESS_TOKEN,
  BUILDABLE_GITHUB_ACCOUNT_ID,
  owner,
  repo,
  pull_number,
}) => {
  const ERRORS = {
    INVALID_BUILDABLE_GITHUB_ACCESS_TOKEN:
      "A valid BUILDABLE_GITHUB_ACCESS_TOKEN field (string) was not provided in the input.",
    INVALID_BUILDABLE_GITHUB_ACCOUNT_ID:
      "A valid BUILDABLE_GITHUB_ACCOUNT_ID field (string) was not provided in the input.",
    INVALID_OWNER: "A valid owner field (string) was not provided in the input.",
    INVALID_REPO: "A valid repo field (string) was not provided in the input.",
    INVALID_PULL_NUMBER: "A valid pull_number field (number) was not provided in the input.",
  };

  if (typeof BUILDABLE_GITHUB_ACCESS_TOKEN !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_GITHUB_ACCESS_TOKEN);
  if (typeof BUILDABLE_GITHUB_ACCOUNT_ID !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_GITHUB_ACCOUNT_ID);
  if (typeof owner !== "string") throw new Error(ERRORS.INVALID_OWNER);
  if (typeof repo !== "string") throw new Error(ERRORS.INVALID_REPO);
  if (typeof pull_number !== "number") throw new Error(ERRORS.INVALID_PULL_NUMBER);
};
