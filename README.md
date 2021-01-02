### This is a repo for solving assignment

### File Structure

To maintaining de-coupling structure whole project divided into two directory `client` and `server`.
Both directory runs independently.

### Get up and running

1. cd into server, run `npm i` and then `npm run server`
2. cd into client, run `npm i` and then `npm start`
3. Voila!

**Client folder structure**

- /client

  - node_modules
  - public
  - src

    - /assets -> static assets, mostly for testing
    - /components -> all sort of react components reside here
    - /config -> react app configurations
    - /redux -> for managing global states
      - /auth -> auth related redux states
        - auth.actions.js
        - auth.reducer.js
        - auth.types.js
      - root-reducer.js -> unifying all reducer
      - store.js
    - /pages -> all components in a page assembled here
    - /utils -> custom utility functions
    - apiMap.json -> this file is created for fetching data with custom hooks, providing some data fetching abstraction. Couldn't manage time, yet serve as documents for available api
    - App.js
    - index.js

  - .gitignore
  - package-lock.json
  - package.json

  **Server folder structure**
  Server side part written in MVC flavor. Business logic and route separated in that intention.

  - /server
    - /config -> app configurations to clearing clutter in server.js file
    - /controllers -> business logic resides here
    - /images -> for storing images in app directory
    - /node_modules
    - /routes -> api endpoints
    - /utils -> custom utility functions
    - /validators -> incoming data validation functions
    - .env -> to hold environment variables on dev phase
    - router.js -> all router from /routes unified here for ease of controll
    - server.js -> entry point
