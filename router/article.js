const express = require('express')
const router = express.Router()
const Article = require("../models/article.model");
const RoleController = require('../controller/role.controller')

router.get('/', function (req, res)
{

    Article.getAllArticles().then((articles) => {
        res.json(articles)
    })
})

router.get('/:id', function (req, res)
{
    Article.getOneArticle(req).then((article) => {
        res.json(article)
    })
})

router.get('/restaurant/:id', function (req, res)
{
    Article.getAllArticlesbyRestaurant(req.params.id).then( (articles) => {
        res.json(articles)
    })
})

router.post('/', function (req, res)
{
    if(req.body.roleToken === 2) {
        Article.createArticle(RoleController.getBody(req.body))
        res.status(201).send('you added a new article')
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

router.put('/:id', function (req, res)
{
    if(req.body.roleToken === 2) {
        Article.updateOneArticle(req.params.id, RoleController.getBody(req.body))
        res.status(201).send('you updated an article')
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

router.delete('/:id', function (req, res)
{
    if(req.body.roleToken === 2) {
        Article.deleteArticle(req.params.id)
    }
    else
    {
        res.status(403).send('Unauthorized call')
    }
})

module.exports = router;