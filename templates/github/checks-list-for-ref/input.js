const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_ID: $env.BUILDABLE_GITHUB_ACCOUNT_ID, // Required
    owner: "string", // Required
    repo: "string", // Required
    ref: "string", // Required

    // check_name: "string",
    // status: "queued",
    // filter: "latest",
    // per_page: 30,
    // page: 1,
    // app_id: 0,
  };
};
