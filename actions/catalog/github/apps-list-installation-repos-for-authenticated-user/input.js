const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_USERNAME: $env.BUILDABLE_GITHUB_ACCOUNT_USERNAME, // Required
    installation_id: 0, // Required

    // per_page: 30,
    // page: 1,
  };
};
