const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/wins', { useNewUrlParser: true })
const db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
  console.log('____________________________')
});

db.once('open', function () {
  console.log('mongoose connected successfully');
  console.log('____________________________')
});


let serveceProviderSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  age: Number,
  rating: Number
});

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  rating: Number
});

let postSchema = new mongoose.Schema({
  user: String,
  task: String,
  time: String,
  Categories: String,
  Price: String,
  isUrgent: String,
  scheduledDate: String,
  Location: String,
  requested: Boolean,
  listOfProviders: Array,
  inProgress: Boolean,
  booking: Boolean,
  accomplished: Boolean,
  userRating: Number,
  serveceProviderRating: Number,
  serveceProvider: String,
  reports: Number
});


// let serveceProvider = mongoose.model('users', serveceProviderSchema);
let users = mongoose.model('users', userSchema);
let posts = mongoose.model('posts', postSchema);


module.exports = {
  users,
  posts
  // serveceProvider
}