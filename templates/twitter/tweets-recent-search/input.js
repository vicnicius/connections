/**
 * ----------------------------------------------------------------------------------------------------
 * Recent Search [Input]
 *
 * @author    Buildable Technologies Inc.
 * @access    open
 * @license   MIT
 * @docs      https://developer.twitter.com/en/docs/api-reference-index#twitter-api-v2
 * ----------------------------------------------------------------------------------------------------
 */

/**
 * Lets you select the input for your Node's run function
 *
 * @param {Params} params
 * @param {Object} $trigger - This Flow's request object
 * @param {Object} $nodes - Data from above Nodes
 */
const nodeInput = ({ $trigger, $nodes }) => {
  return {
    TWITTER_BEARER_TOKEN: $trigger.env.TWITTER_BEARER_TOKEN, // Required
    query: "(from:TwitterDev OR from:TwitterAPI) has:media -is:retweet", // Required

    // start_time: "2019-08-24T14:15:22Z",
    // end_time: "2019-08-24T14:15:22Z",
    // since_id: "1346889436626259968",
    // until_id: "1346889436626259968",
    // max_results: 10,
    // sort_order: "recency",
    // next_token: "string",
    // pagination_token: "string",
    // expansions: ["author_id","referenced_tweets.id","in_reply_to_user_id","geo.place_id","attachments.media_keys","attachments.poll_ids","entities.mentions.username","referenced_tweets.id.author_id"],
    // tweetFields: ["created_at","author_id","entities","conversation_id","reply_settings","public_metrics"],
    // userFields: ["username","verified","profile_image_url"],
    // mediaFields: ["media_key","duration_ms","height","preview_image_url","type","url","width","public_metrics"],
    // placeFields: ["id","name","country_code","place_type","full_name","country","contained_within","geo"],
    // pollFields: ["duration_minutes","options","voting_status","end_datetime"],
  };
};
