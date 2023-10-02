# Blog API

This is a simple Express.js application for fetching and searching blog data from an external API.

## Installation

Before running the application, make sure you have Node.js and npm installed on your system. Follow these steps to get started:

1. Clone this repository to your local machine:

```
   git clone https://github.com/yourusername/blog-api.git
```

2. Navigate to the project directory:

```
cd blog-api
```
3. Install the required dependencies:

```
npm install
```

## Configuration

To configure the application, you need to set up environment variables. Create a .env file in the project root directory and add the following variables:

```
URL=<https://api.example.com/blog-data>
SECRET=<your-api-secret-key>
ENV=<DEV-or-PROD>
```

## Usage

### Starting the Application

To start the application, run the following command:

```
npm start
```

The application will start, and you will see a message indicating that it's running on a specific port (e.g., "The app is running on port 8080").

## Routes

Fetch Blog Statistics

```
Route: /api/blog-stats
Method: GET
Description: Fetch statistics about the available blogs, including the total number of blogs, the blog with the longest title, the number of blogs with titles containing the word "privacy," and a list of unique blog titles.
Example: http://localhost:8080/api/blog-stats
```

Search for Blogs

```
oute: /api/blog-search
Method: GET
Description: Search for blogs based on a query parameter. Provide a query parameter in the URL to search for blogs with titles containing the specified keyword.
Example: http://localhost:8080/api/blog-search?query=privacy
```

