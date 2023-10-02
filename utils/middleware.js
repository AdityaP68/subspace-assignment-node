const createError = require("http-errors");
const axios = require("axios")

const fetchBlogsDataMiddleware = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }
    );
    // check if the api request was successful or not
    if (response.statusText !== "OK") {
      throw createError(response.status, "Failed to fetch blog data");
    }

    req.blogData = response?.data?.blogs || []
    
    next();

  } catch (error) {
    next(error);
  }
};

module.exports = {fetchBlogsDataMiddleware}