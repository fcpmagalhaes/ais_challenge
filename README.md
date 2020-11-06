# AIS Digital Challenge
Challenge provided by AIS Digital company to a back-end develloper job vacancy


This project contains the following module:
 - API (Node.js)

   A system that is requested by a client to get info about movies. Internaly, the system requests the movie details and translations from [TMDB API](https://www.themoviedb.org/ , save the datas in DB and than return to the client the response with data or error message if the movie isn't found. JWT authentication is used to provide access and ExpressJS is our framework.

### ⚙ API Instalation

As an Express project, the installation is very simple. To run this project locally you just need to install the dependencies, run the migrations of database and start ✨

I recommend using npm as your package manager:

``` javascript
npm install
```

After install all packages we need run the migrations and seeds:

``` javascript
npx knex migrate:latest
npx knex seed:run
```

Create a .env file and set a secret string to be used at JWT auth:
``` javascript
SECRET_KEY=some_secret
```

At last, just is necessary run the application:

``` javascript
npm start
```


It will run the app in the development mode. Open [http://localhost:3333](http://localhost:33333) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

***📖  Documentation:***

> Our API is documentated usig OpenApi3/Swagger. Like Postman, but on steroids, all required and not required parameters are already set, there are examples to easily see what you can use in the request, and responses are described to understand what we are getting from the server. Try it out [http://localhost:3333/api-docs](http://localhost:33333/api-docs)


Using some API Testing Tools as Postman or Insomnia, its possible access the end-points. There you can create a user, init a session, and get the moovie informations that you want. 


With this file 👉 "Desafio AIS API.postman_collection.json" you can load all our collection quickly. After create a session, copy you token auth to the global variable token. It will allow you play with us 🎢