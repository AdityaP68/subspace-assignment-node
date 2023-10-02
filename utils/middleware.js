const createError = require("http-errors");
const axios = require("axios");


const fetchBlogsDataMiddleware = async (req, res, next) => {

  try {
    const response = await axios.get(process.env.URL, {
      headers: {
        "x-hasura-admin-secret": process.env.SECRET,
      },
    });
    console.log(response);
    // check if the api request was successful or not
    if (response.statusText !== "OK") {
      throw createError(response.status, "Failed to fetch blog data");
    }

    req.blogData = response?.data?.blogs || [];

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { fetchBlogsDataMiddleware };
