const express = require('express');
const models = require('../models/models');
const menu_validations = require('../validations/menu');
const Menu = models.Menu;
const MenuItem = models.MenuItem;


function validateMenu(menu) {
    menu_validations.forEach(function (validation_callback){
        validation_callback(menu)
    });
}

function _createMenuItem(menu_item, menu) {
    menu_item.menu = menu;
    MenuItem.create(menu_item, (e, menu_item) => {
        if (e) {
            console.log(e);
            res.sendStatus(500);
        } else {
            res.send(menu_item);
        }
    });
}

function _(menu) {
    if (typeof(menu.items) !== 'undefined') {
        menu.items.forEach(function(menu_item) {
            createMenuItem(menu_item);
        });
    }
}

// ======
// Create
// ======
const create = (req, res) => {
    const menu = req.body;
    validateMenu(menu);
    _createMenuItems(menu);
    Menu.create(menu, (e,menu) => {
        if(e) {
            console.log(e);
            res.sendStatus(500);
        } else {
            res.send(menu);
        }
    });
};

// =========
// Read many
// =========
const readMany = (req, res) => {
    let query = res.locals.query || {};

    Menu.find(query, (e,result) => {
        if(e) {
            res.status(500).send(e);
            console.log(e.message);
        } else {
            res.send(result);
        }
    });
};

// ========
// Read one
// ========
const readOne = (req, res) => {
    const { _id } = req.params;

    Menu.findById(_id, (e,result) => {
        if(e) {
            res.status(500).send(e);
            console.log(e.message);
        } else {
            res.send(result);
        }
    });
};

// ======
// Update
// ======
const update = (req, res) => {
    const changedEntry = req.body;
    Menu.update({ _id: req.params._id }, { $set: changedEntry }, (e) => {
        if (e)
            res.sendStatus(500);
        else
            res.sendStatus(200);
    });
};

// ======
// Remove
// ======
const remove = (req, res) => {
    Menu.remove({ _id: req.params._id }, (e) => {
        if (e)
            res.status(500).send(e);
        else
            res.sendStatus(200);
    });
};

// ======
// Create MenuItem
// ======
const createMenuItem = (req, res) => {
    const menu_id = req.params._menu_id;
    const menuItem = req.body;
    menuItem.menu = menu_id;
    MenuItem.create(menuItem, (e,menuItem) => {
        if(e) {
            console.log(e);
            res.sendStatus(500);
        } else {
            res.send(menuItem);
        }
    });
};

// ======
// Routes
// ======

let router = express.Router();

router.post('/', create);
router.get('/', readMany);
router.get('/:_id', readOne);
router.put('/:_id', update);
router.delete('/:_id', remove);
router.post('/:_menu_id/menuItem', createMenuItem);
// router.get('/:_menu_id/menuItem/', getMenuItems);
// router.get('/:_menu_id/menuItem/:id', getMenuItem);


module.exports = router;
