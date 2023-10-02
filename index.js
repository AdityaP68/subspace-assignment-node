const express = require("express");
const _ = require("lodash");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const axios = require("axios");
const { fetchBlogsDataMiddleware } = require("./utils/middleware");
require("dotenv").config();

const app = express();

// middleware for logging http req in dev env
if (process.env.ENV?.toLowerCase() === "dev") {
  app.use(morgan("combined"));
}
// middleware setup for data serialization
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res, next) => {
  res.send("Home Route");
});

// route handler for fetching blog insights
app.get("/api/blog-stats", fetchBlogsDataMiddleware, async (req, res, next) => {
  try {
    // 1. Fetch Blog data using middleware
    const blogData = req?.blogData;

    if (blogData.length === 0) {
      res.status(200).json({
        message: "No data found",
      });
    }

    // 2. Process the Data using Lodash package
    try {
      // Calculate the total number of blogs fetched
      const totalBlogs = blogData.length;

      // Find the blog with the longest title
      const longestTitleBlog = _.maxBy(blogData, (blog) => blog.title.length);

      // Determine the number of blogs with titles containing the word "privacy"
      const blogsWithPrivacyTitle = _.filter(blogData, (blog) =>
        _.includes(_.toLower(blog.title), "privacy")
      ).length;

      // Create an array of unique blog titles (no duplicates)
      const uniqueBlogTitles = _.uniqBy(blogData, "title").map(
        (blog) => blog.title
      );

      // 3. Send JSON response for processed data
      res.json({
        totalBlogs,
        longestTitleBlog: longestTitleBlog.title,
        blogsWithPrivacyTitle,
        uniqueBlogTitles,
      });
    } catch (error) {
      // handle error while data processing
      const processingError = createError(500, "Error processing the data");
      next(processingError);
    }
  } catch (error) {
    next(error);
  }
});

// Route handler for searching blogs based on a query parameter
app.get(
  "/api/blog-search",
  fetchBlogsDataMiddleware,
  async (req, res, next) => {
    try {
      // Get the fetched blog data from the middleware
      const blogData = req?.blogData;
      // Extract the search query parameter from the request
      const searchQuery = req.query?.query;

      // Filter the blog data based on titles containing the search query
      if (!searchQuery) {
        throw createError(400, "No Query Parameter provided");
      }
      // Filter the blog data based on titles containing the search query
      const searchResult = blogData.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery)
      );

      // Send a JSON response containing the search results
      res.json({ result: searchResult });
    } catch (error) {
      next(error);
    }
  }
);

// all-catching-route
app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exists"));
});

// error handling middleware
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(8080, () => {
  console.log("The app is running on port 8080");
});
