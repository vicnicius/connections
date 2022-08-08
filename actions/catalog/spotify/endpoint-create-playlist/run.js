const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_SPOTIFY_CLIENT_ID,
    BUILDABLE_SPOTIFY_CLIENT_SECRET,
    BUILDABLE_SPOTIFY_BASE_URI,
    user_id,
    name,
    collaborative,
    description,
    public,
  } = input;

  verifyInput(input);

  try {
    const {
      data: { access_token },
    } = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: BUILDABLE_SPOTIFY_CLIENT_ID,
        password: BUILDABLE_SPOTIFY_CLIENT_SECRET,
      },
      data: qs.stringify({ grant_type: "client_credentials" }),
    });

    const { data } = await axios({
      method: "post",
      url: `${BUILDABLE_SPOTIFY_BASE_URI}/users/${user_id}/playlists`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        name,
        ...(collaborative ? { collaborative } : {}),
        ...(description ? { description } : {}),
        ...(public ? { public } : {}),
      },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({
  BUILDABLE_SPOTIFY_CLIENT_ID,
  BUILDABLE_SPOTIFY_CLIENT_SECRET,
  BUILDABLE_SPOTIFY_BASE_URI,
  user_id,
  name,
}) => {
  const ERRORS = {
    INVALID_BUILDABLE_SPOTIFY_CLIENT_ID:
      "A valid BUILDABLE_SPOTIFY_CLIENT_ID field (string) was not provided in the input.",
    INVALID_BUILDABLE_SPOTIFY_CLIENT_SECRET:
      "A valid BUILDABLE_SPOTIFY_CLIENT_SECRET field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_BUILDABLE_SPOTIFY_BASE_URI:
      "A valid BUILDABLE_SPOTIFY_BASE_URI field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_USER_ID: "A valid user_id field (string) was not provided in the input.",
    INVALID_NAME: "A valid name field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_SPOTIFY_CLIENT_ID !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SPOTIFY_CLIENT_ID);
  if (typeof BUILDABLE_SPOTIFY_CLIENT_SECRET !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SPOTIFY_CLIENT_SECRET);
  if (typeof BUILDABLE_SPOTIFY_BASE_URI !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_SPOTIFY_BASE_URI);
  if (typeof user_id !== "string") throw new Error(ERRORS.INVALID_USER_ID);
  if (typeof name !== "string") throw new Error(ERRORS.INVALID_NAME);
};