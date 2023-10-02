const createError = require("http-errors");
const axios = require("axios");

// Middleware for fetching blog data
const fetchBlogsDataMiddleware = async (req, res, next) => {
  try {

    // Make an HTTP GET request to the specified URL with headers
    const response = await axios.get(process.env.URL, {
      headers: {
        "x-hasura-admin-secret": process.env.SECRET,
      },
    });

    // Check if the API request was successful (status code 200)
    if (response.status !== 200) {
      // If not successful, throw an HTTP error with a message
      throw createError(response.status, "Failed to fetch blog data");
    }

    // Extract the 'blogs' data from the API response, or default to an empty array
    req.blogData = response?.data?.blogs || [];

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    // If any error occurs during the process, pass it to the error-handling middleware
    next(error);
  }
};

module.exports = { fetchBlogsDataMiddleware };
