require("dotenv").config()
require("./strategies/discord")
const express = require("express")
const passport = require("passport")
const app = express()
const PORT = process.env.PORT || 3003
const routes = require ("./routes")


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/djsDashboard', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  // useFindAndModify :false 

});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
  // we're connected!
  console.log("db Connected")
});

app.use(passport.initialize() )
app.use(passport.session() )



app.use("/api" , routes)





app.listen(PORT , () => console.log("Runing on Port " + PORT))