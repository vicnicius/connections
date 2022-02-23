/**
 * ----------------------------------------------------------------------------------------------------
 * Get States or Provinces [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 *
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from the Nodes above
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    COUNTRY_STATES_URL: $trigger.env.COUNTRY_STATES_URL, // Required

    query: {
      country: "United States", // Required
    },
    page: 1,
    pageSize: 10,
  };
};
