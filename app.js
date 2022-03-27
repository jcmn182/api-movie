const express = require('express');

//controllers 
const { globalErrorHandler } = require('./controllers/error.controller.js');

//routes
const {actorsRouter} = require('./routes/actors.route.js');
const {moviesRouter} = require('./routes/movies.route.js');
const {usersRouter} = require('./routes/users.route.js');
const {postRouter} = require('./routes/post.route.js');

//Utils
const {AppError} =require('./util/appError.js');

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postRouter);


app.use('*', (req, res, next) => {
    next(new AppError(404, `${req.originalUrl} not found in this server.`));
});
  
// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };