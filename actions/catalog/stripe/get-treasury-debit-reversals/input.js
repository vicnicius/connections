const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    financial_account: "string", // Required

    // ending_before: "string",
    // expand: ["string"],
    // limit: 0,
    // received_debit: "string",
    // resolution: "lost",
    // starting_after: "string",
    // status: "canceled",
  };
};
