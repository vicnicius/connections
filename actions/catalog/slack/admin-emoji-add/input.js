const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_SLACK_ACCESS_TOKEN: $env.BUILDABLE_SLACK_ACCESS_TOKEN, // Required
    name: "string", // Required
    token: "string", // Required
    url: "string", // Required
  };
};
