const mongoose = require('mongoose');

// connect with mongodb
mongoose.connect(process.env.MONGODB)
    .then(() => console.log("Conection with MongoDB sucessful"))
    .catch((error) => console.error(error));
