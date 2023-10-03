const _ = require("lodash");

// Function for calculating blog stats
const calculateBlogStats = (blogData) => {
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

  return {
    totalBlogs,
    longestTitleBlog: longestTitleBlog.title,
    blogsWithPrivacyTitle,
    uniqueBlogTitles,
  };
};

// Create a memoized version of the calculateBlogStats function with
// a custom resolver function for the cache key
const memoizedAnalyticsData = _.memoize(calculateBlogStats, (blogData) =>
  blogData.length.toString()
);

// Define the function for searching blogs
async function searchBlogs(blogData, searchQuery) {
  console.log("omk", searchQuery);
  const searchResult = blogData.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery)
  );

  return { searchResult };
}

// Create a memoized version of the searchBlogs function with
// a custom resolver function for the cache key
const memoizedSearchBlogs = _.memoize(searchBlogs, (blogData, searchQuery) => {
  // Generate a unique cache key based on both parameters
  return `${JSON.stringify(blogData)}:${searchQuery}`;
});

module.exports = {
  memoizedAnalyticsData,
  memoizedSearchBlogs,
};
