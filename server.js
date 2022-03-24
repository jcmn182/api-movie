const { app } = require('./app');

// Utils
const { db } = require('./util/dataBase.js');
const { initModels } = require('./util/initModels');

db
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

// Models relations
initModels();

db
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

const PORT =  4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
