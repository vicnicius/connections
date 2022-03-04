/**
 * ----------------------------------------------------------------------------------------------------
 * Send NEO Smart Contract Tokens [Run]
 *
 * @description - Send neo smart contract tokens using the Tatum API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://tatum.io/apidoc.php#operation/NeoInvokeSmart
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
    TATUM_API_URL,
    TATUM_API_KEY,
    fromPrivateKey,
    to,
    scriptHash,
    amount,
    numOfDecimals,
    additionalInvocationGas,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `${TATUM_API_URL}/v3/neo/invoke`,
      headers: { "x-api-key": `${TATUM_API_KEY}` },
      params: {},
      data: {
        fromPrivateKey,
        to,
        scriptHash,
        amount,
        numOfDecimals,
        ...(additionalInvocationGas ? { additionalInvocationGas } : {}),
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
  TATUM_API_KEY,
  TATUM_API_URL,
  fromPrivateKey,
  to,
  scriptHash,
  amount,
  numOfDecimals,
}) => {
  const ERRORS = {
    INVALID_TATUM_API_KEY: "A valid TATUM_API_KEY field (string) was not provided in the input.",
    INVALID_TATUM_API_URL: "A valid TATUM_API_URL field (string) was not provided in the input.",
    INVALID_FROM_PRIVATE_KEY:
      "A valid fromPrivateKey field (string) was not provided in the input.",
    INVALID_TO: "A valid to field (string) was not provided in the input.",
    INVALID_SCRIPT_HASH: "A valid scriptHash field (string) was not provided in the input.",
    INVALID_AMOUNT: "A valid amount field (number) was not provided in the input.",
    INVALID_NUM_OF_DECIMALS: "A valid numOfDecimals field (number) was not provided in the input.",
  };

  if (typeof TATUM_API_KEY !== "string") throw new Error(ERRORS.INVALID_TATUM_API_KEY);
  if (typeof TATUM_API_URL !== "string") throw new Error(ERRORS.INVALID_TATUM_API_URL);
  if (typeof fromPrivateKey !== "string") throw new Error(ERRORS.INVALID_FROM_PRIVATE_KEY);
  if (typeof to !== "string") throw new Error(ERRORS.INVALID_TO);
  if (typeof scriptHash !== "string") throw new Error(ERRORS.INVALID_SCRIPT_HASH);
  if (typeof amount !== "number") throw new Error(ERRORS.INVALID_AMOUNT);
  if (typeof numOfDecimals !== "number") throw new Error(ERRORS.INVALID_NUM_OF_DECIMALS);
};
