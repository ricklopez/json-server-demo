const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id',
  '/v1/courses': '/courses_auth'
}));

server.use(middlewares);

// server.use((req, res, next) => {
//   console.log("In Auth Middleware");
//  if (isAuthorized(req)) { // add your authorization logic here
//    next(); // continue to JSON Server router
//  } else {
//    res.sendStatus(401);
//  }
// });

server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

server.post('/v1/users', (req, res) => {
  
  const user = {
  message: 'Successfully created new user.',
  user: {
    id: Date.now(), //for mock only
    email: req.body.email,
    password: req.body.password, //mock only
    updatedAt: '2018-10-04T06:12:15.125Z',
    createdAt: '2018-10-04T06:12:15.125Z'
  },
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpYXQiOjE1Mzg2MzM1MzUsImV4cCI6MTUzODY0MzUzNX0.Hmza-AxTohxXOuB_BQRnFQBuE_YGHcmJVCdXnXQv370',
  success: true
};
  
  res.json(user);
});

server.post('/auth', (req, res) => {
  
  const user = authAndGetUser(req.body, req.headers);
  
  res.json(user);
});


server.use(router);

server.listen(process.env.PORT || 3001, () => {
  console.log(`JSON Server is running on ${process.env.PORT || 3001}`);
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