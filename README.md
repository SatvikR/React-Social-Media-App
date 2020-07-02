# React Social Media App

This is a twitter-like app made with MongoDB, Express, React.js, and node.js

Steps to Run:

First create a file called `.env` in the backend directory. In that file, create a variable called `ATLAS_URI` and set its value to your mongodb uri.

In the end your `.env` file should look like this:

```
ATLAS_URI=myatlasuri
```

Then, run these 3 commands:

```
# install frontend dependencies
npm install

# install backend dependencies
npm run install-server

# Run the app
npm run start-all
```

Once you've ran those commands, go to http://localhost:3000 in your browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
