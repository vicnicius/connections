const nodeInput = ({ $body, $headers, $env, $data }) => {
  return {
    BUILDABLE_GITHUB_ACCESS_TOKEN: $env.BUILDABLE_GITHUB_ACCESS_TOKEN, // Required
    BUILDABLE_GITHUB_ACCOUNT_ID: $env.BUILDABLE_GITHUB_ACCOUNT_ID, // Required
    hook_id: 0, // Required

    // config: { url: "string", content_type: "string", secret: "string", insecure_ssl: "string" },
    // events: ["string"],
    // active: true,
  };
};
