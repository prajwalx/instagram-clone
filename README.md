# Insta + FB Clone 🥳
A Social Media 👥 Clone Application using MongoDB, Express, React, Node and Docker
🌟 Some Features of this app:
  -  Login / Signup
  - View Profile
  - Send Friend Requests
  - Post Pictures
  - Like / Unlike Posts
  - Search Users by name / email / location
  ## Some ScreenShots
   ### Profile 
![alt text](https://i.ibb.co/w0MkMSC/Screenshot-2020-10-24-at-8-32-06-PM.png "Logo Title Text 1")

### NewsFeed
![alt text](https://i.ibb.co/8B5jSf5/Screenshot-2020-10-24-at-8-32-37-PM.png "Logo Title Text 1")

### Users
![alt text](https://i.ibb.co/whC3N46/Screenshot-2020-10-24-at-8-30-13-PM.png "Logo Title Text 1")

### Signup / Login
![alt text](https://i.ibb.co/1fgZjLY/Screenshot-2020-10-24-at-8-26-48-PM.png "Logo Title Text 1")

Pull Requests are welcome for new features, bug fixes and others.


## Playing locally

The complete app is dockerized and can be set up by a single command :🤩
Open terminal in root directory and run
```bash
$ docker-compose up
```
Note: If you are new to docker download [Docker Desktop](https://www.docker.com/products/docker-desktop) and keep it running before executing above command

## Directory structure

### Overview

You can customize the `src` and `api` directories.

```
src/
├─ api/
│  ├─ User
│  │  ├─ controller.js
│  │  ├─ index.js
│  │  ├─ index.test.js
│  │  ├─ model.js
│  │  └─ model.test.js
│  └─ index.js
├─ services/
│  ├─ express/
│  ├─ mongoose/
│  └─ response-service/
├─ app.js
├─ config.js
└─ index.js
```

### src/api/

Here is where the API endpoints are defined. Each API has its own folder.

#### src/api/some-endpoint/model.js

It defines the Mongoose schema and model for the API endpoint. Any changes to the data model should be done here.

#### src/api/some-endpoint/controller.js

This is the API controller file. It defines the main router middlewares which use the API model.

#### src/api/some-endpoint/index.js

This is the entry file of the API. It defines the routes using, along other middlewares (like session, validation etc.), the middlewares defined in the `some-endpoint.controller.js` file.

### services/

Here you can put `helpers`, `libraries` and other types of modules which you want to use in your APIs.
