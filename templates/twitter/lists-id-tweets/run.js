/**
 * ----------------------------------------------------------------------------------------------------
 * List Tweets Timeline by List ID [Run]
 *
 * @description - List Tweets Timeline by List ID using the Twitter v2 API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.twitter.com/en/docs/api-reference-index#twitter-api-v2
 *
 * ----------------------------------------------------------------------------------------------------
 */

const axios = require("axios");
const qs = require("qs");

/**
 * The Node’s executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  const {
    TWITTER_BEARER_TOKEN,
    id,
    max_results,
    pagination_token,
    expansions,
    tweetFields,
    userFields,
    mediaFields,
    placeFields,
    pollFields,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.twitter.com/2/lists/${id}/tweets`,
      auth: {},
      headers: { authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      params: {
        ...(max_results ? { max_results } : {}),
        ...(pagination_token ? { pagination_token } : {}),
        ...(expansions ? { expansions } : {}),
        ...(tweetFields ? { "tweet.fields": tweetFields } : {}),
        ...(userFields ? { "user.fields": userFields } : {}),
        ...(mediaFields ? { "media.fields": mediaFields } : {}),
        ...(placeFields ? { "place.fields": placeFields } : {}),
        ...(pollFields ? { "poll.fields": pollFields } : {}),
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "comma" });
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
const verifyInput = ({ id }) => {
  const ERRORS = {
    INVALID_ID: "A valid id field (string) was not provided in the input.",
  };

  if (typeof id !== "string") throw new Error(ERRORS.INVALID_ID);
};
