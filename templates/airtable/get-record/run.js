/**
 * ----------------------------------------------------------------------------------------------------
 * Get Record [Run]
 *
 * @description - Get a record from a table using the Airtable API
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://airtable.com/api
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
  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, endpoint, tableName, recordId } = input;

  verifyInput(input);

  const url = getUrl({ endpoint, AIRTABLE_BASE_ID, tableName, recordId });

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    return data;
  } catch (error) {
    const code = getStatusCodeFromErrorMessage(error?.message);
    const messageData = getErrorMessageFromStatusCode(code);

    return {
      failed: true,
      message: messageData?.message,
      data: {
        type: messageData?.type,
        statusCode: code,
        ...error.config,
      },
    };
  }
};

const getUrl = ({ endpoint, AIRTABLE_BASE_ID, tableName, recordId }) => {
  const url = `${endpoint}/${AIRTABLE_BASE_ID}/${tableName}/${recordId}`;

  return encodeURI(url);
};

const verifyInput = ({ AIRTABLE_API_KEY, AIRTABLE_BASE_ID, endpoint, tableName, recordId }) => {
  const ERRORS = {
    INVALID_AIRTABLE_API_KEY: `A valid AIRTABLE_API_KEY field (string) was not provided in the input. 
                                 You can add one to your environment variables at 
                                 https://app.buildable.dev/settings/environment-variables.`,

    INVALID_AIRTABLE_BASE_ID:
      "A valid AIRTABLE_BASE_ID field (string) was not provided in the input.",
    INVALID_ENDPOINT: "A valid endpoint field (string) was not provided in the input.",
    INVALID_TABLE_NAME: "A valid tableName field (string) was not provided in the input.",
    INVALID_RECORD_ID: "A valid recordId field (string) was not provided in the input.",
  };

  if (typeof AIRTABLE_API_KEY !== "string") throw new Error(ERRORS.INVALID_AIRTABLE_API_KEY);
  if (typeof AIRTABLE_BASE_ID !== "string") throw new Error(ERRORS.INVALID_AIRTABLE_BASE_ID);
  if (typeof endpoint !== "string") throw new Error(ERRORS.INVALID_ENDPOINT);
  if (typeof tableName !== "string") throw new Error(ERRORS.INVALID_TABLE_NAME);
  if (typeof recordId !== "string") throw new Error(ERRORS.INVALID_RECORD_ID);
};

const getStatusCodeFromErrorMessage = (message) => {
  const statusCodes = [400, 401, 402, 403, 404, 413, 422, 500, 502, 503];
  return statusCodes.find((code) => message.includes(code)) || 500;
};

const getErrorMessageFromStatusCode = (statusCode) => {
  const errorMessages = {
    400: {
      message: "The request encoding is invalid; the request can't be parsed as a valid JSON.",
      type: "Bad Request",
    },
    401: {
      message: "Accessing a protected resource without authorization or with invalid credentials.",
      type: "Unauthorized",
    },
    402: {
      message:
        "The account associated with the API key making requests hits a quota that can be increased by upgrading the Airtable account plan.",
      type: "Payment Required",
    },
    403: {
      message:
        "Accessing a protected resource with API credentials that don't have access to that resource.",
      type: "Forbidden",
    },
    404: {
      message:
        "Route or resource is not found. This error is returned when the request hits an undefined route, or if the resource doesn't exist (e.g. has been deleted).",
      type: "Not Found",
    },
    413: {
      message:
        "The request exceeded the maximum allowed payload size. You shouldn't encounter this under normal use.",
      type: "Request Entity Too Large",
    },
    422: {
      message:
        "The request data is invalid. This includes most of the base-specific validations. You will receive a detailed error message and code pointing to the exact issue.",
      type: "Invalid Request",
    },
    500: {
      message: "The server encountered an unexpected condition.",
      type: "Internal Server Error",
    },
    502: {
      message:
        "Airtable's servers are restarting or an unexpected outage is in progress. You should generally not receive this error, and requests are safe to retry.",
      type: "Bad Gateway",
    },
    503: {
      message:
        "The server could not process your request in time. The server could be temporarily unavailable, or it could have timed out processing your request. You should retry the request with backoffs.",
      type: "Service Unavailable",
    },
  };

  return errorMessages[statusCode];
};
