const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required

    // customer: "string",
    // ending_before: "string",
    // expand: ["string"],
    // invoice: "string",
    // limit: 0,
    // starting_after: "string",
  };
};
