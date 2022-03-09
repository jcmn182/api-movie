const express = require('express');
// routers
const { taskRouter } = require('./express/routes/task.routes');

//utils

const {sequelize} = require('./util/dataBase.js')

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
app.use('/api/v1/todo', taskRouter);

sequelize
.authenticate()
.then(()=> console.log('Databa authenticate'))
.catch(err => console.log(err));

sequelize
.sync()
.then(()=>console.log('Database synced'))
.catch((err)=>console.log(err))

app.listen(4000, () => {
	console.log('Express app running');
});