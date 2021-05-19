# EvolvFit Backend Task #

## Description ##
This is a simple application using Nodejs, Express and MongoDB. Using this API, you can perform basic `Create`-`Read`-`Update`-`Delete` operations on blog posts.


## Installation ##
* Latest version of <strong>Node.js</strong> must be installed.
* Use the command  `npm install` in the directory to get all the dependencies.

## Config Setup ##
* Since the database connection is private, the `.env` file should be setup for MongoDB cloud Atlas.
* The `env.txt` is provided along with package with config variables where the text inside the `<DB connector>` must be replaced with the MongoDB connection url.

## Start server ##
* To start the server - `npm start`
* To start the server using nodemon in dev mode - `npm run dev`
* To start the server using nodemon in production mode - `npm run start:prod`

## API Usage ##
* get all blogs - `curl --location --request GET 'http://localhost:<PORT>/blogs/'`
* get a specific blog - `curl --location --request GET 'http://localhost:<PORT>/blogs/<id>'`
* create a new blog - `curl --location --request POST 'http://localhost:<PORT>/blogs/create'`
* update a blog - `curl --location --request PATCH 'http://localhost:<PORT>/blogs/update/<id>`
* delete a blog - `curl --location --request DELETE 'http://localhost:<PORT>/blogs/delete/<id>'`
* get comments to a blog - `curl --location --request GET 'http://localhost:<PORT>/blogs/get/<id>/comment'`
* post a comment -  `curl --location --request POST 'http://localhost:<PORT>/blogs/create/<id>/comment'`

## Database: <i>NoSQL</i> ##

    1. Since the application falls under the small to medium category, using mongoDB is more convenient, and moreover, the data can be easily represented.

    2. The application is handling only post and comments data but not sensitive transaction data, therefore, the schema can be altered flexibily based on feature updates which is suitable for this type of application.

### Postman collections ###

<a href="https://www.getpostman.com/collections/47c77511a90a6fa8cf95">Visit here</a>

 or

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/47c77511a90a6fa8cf95?action=collection%2Fimport)