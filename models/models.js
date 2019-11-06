const mongoose = require('mongoose');

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;

// =======
// Schemas
// =======

const menuSchema = new Schema(
    {
        created: { type: Date, default: Date.now },
        rest: String, //MongoId,

    },
    { strict: false }
);

const menuItemSchema = new Schema(
    {
        created: { type: Date, default: Date.now },
        title: String,
        menu: String, // MongoId,

    },
    { strict: false }
);


const models = {};
models.Menu = mongoose.model('menu', menuSchema);
models.MenuItem = mongoose.model('menuItem', menuItemSchema);

module.exports = models;
