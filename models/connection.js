const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://margauxcourageux:mUqMEXpXz6vohqui@clustermc.eeyow1k.mongodb.net/weatherapp';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
