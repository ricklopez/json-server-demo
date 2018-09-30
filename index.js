const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  console.log("In Auth Middleware");
 if (isAuthorized(req)) { // add your authorization logic here
   next() // continue to JSON Server router
 } else {
   res.sendStatus(401)
 }
});

server.use(router);

server.listen(process.env.PORT || 3001, () => {
  console.log('JSON Server is running')
});

function isAuthorized(){
  return true;
}