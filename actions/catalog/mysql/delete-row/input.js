const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    MYSQL_CONNECTION_KEY: $env.MYSQL_CONNECTION_KEY, // Required
    tableName: "table_name", // Required
    id: 1, // Required
  };
};
