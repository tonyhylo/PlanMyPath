// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Mypath = require('./models/mypath')
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

// Local variables will come in handy for holding retrieved documents
let user, item, category, order;
let users, items, categories, orders;

const newPath = Mypath.create({country: 'Canada', description: 'true north', tags: 'north', itinerary: 'depart airport'}).then((result) => console.log(result)).catch((e) => console.log(e))

const path = Mypath.find({}).then((result) => console.log(result)).catch((e) => console.log(e))