const express = require('express')
const router = express.Router()
const Menu = require("../models/menu.model");
const MenuController = require('../controller/menu.controller')
const RoleController = require('../controller/role.controller')

router.get('/', function (req, res)
{
    Menu.getAllMenus().then( (menus) => {
        res.json(menus)
    })
})

router.get('/:id', function (req, res)
{
    Menu.getOneMenu(req).then( (menu) => {
        res.json(menu)
    })
})

router.get('/restaurant/:id', function (req, res)
{
    Menu.getAllMenusbyRestaurant(req.params.id).then( (menus) => {
        res.json(menus)
    })
})

router.post('/', function (req, res)
{
    if(req.body.roleToken === 2) {
        Menu.createMenu(RoleController.getBody(req.body))
        res.status(201).send('you added a new menu')
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

router.post('/cart', function (req, res)
{
    if(req.body.roleToken === 1) {
        MenuController.fillCart(RoleController.getBody(req.body)).then((data) => {
            res.json(data)
        })
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

router.put('/:id', function (req, res)
{
    if(req.body.roleToken === 2) {
        Menu.updateOneMenu(req.params.id,RoleController.getBody(req.body))
        res.status(201).send('you updated a menu')
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

router.delete('/:id', function (req, res)
{
    if(req.body.roleToken === 2) {
        Menu.deleteMenu(req.params.id)
        res.status(201).send('you deleted a menu')
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

module.exports = router;