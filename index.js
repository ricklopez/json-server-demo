const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
  console.log("In Auth Middleware");
 if (isAuthorized(req)) { // add your authorization logic here
   next(); // continue to JSON Server router
 } else {
   res.sendStatus(401);
 }
});

server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

server.post('/auth', (req, res) => {
  
  const user = authAndGetUser(req.body, req.headers);
  
  res.json(user);
});


server.use(router);

server.listen(process.env.PORT || 3001, () => {
  console.log('JSON Server is running');
});

function isAuthorized(req){
  console.log(req.headers.hasOwnProperty('authorization') ? req.headers.authorization : null );
  var regexTest = RegExp('bearer*','g');
  const authHeaderValue = req.headers.hasOwnProperty('authorization')? req.headers.authorization.toLowerCase() : ' ';
  const isAuth = regexTest.test(authHeaderValue);
  return isAuth;
}

function authAndGetUser(body, headers){
  return {
    username: "",
    role:"",
    authToken: "",
    headers: headers
  }
}