const  mongoose  = require("mongoose");
const URI = 'mongodb://localhost/local';

mongoose.connect(URI)
.then(db => console.log('MongoDB working.'))
.catch(err => console.log(`Error in database ${err}`));

module.exports = mongoose;