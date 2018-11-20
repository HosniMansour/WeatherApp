# WeatherApp

How to run the App :

( I didn't find time to use docker :( )
The app uses Express/NodeJs with MongoDB in the backend with reactJs in the front end

So to run the BackEnd (There must be mongodb database mongodb://127.0.0.1:27017): 

> cd WeatherApp

> npm install

> npm run server-dev

--> To Add data 

> npm install pow-mongodb-fixtures -g

> mongofixtures weather server/data.js

To run the front end

> cd client

> npm install

> npm start


I did waste some time with symfony at first, later with react and node I took my time using redux, bootstrap .. so yep I couldn't finish everything in time I still have the details page and the add fucnction have a bug in the beck end even it's implimented in the frontend 
