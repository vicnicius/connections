const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required

    // amount: { gt: 0, gte: 0, lt: 0, lte: 0 },
    // created: { gt: 0, gte: 0, lt: 0, lte: 0 },
    // ending_before: "string",
    // expand: ["string"],
    // limit: 0,
    // starting_after: "string",
    // status: "canceled",
  };
};
