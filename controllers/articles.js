var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	db.article.findAll({
		include: [db.author]
	}).then(function(articles){
		res.render('articles/all', {results: articles});	
	});
});

router.post('/', function(req, res){
	// res.send(req.body);
	db.article.create(req.body).then(function(createdArticle){
		res.redirect('/articles/' + createdArticle.id);
	}).catch(function(err){
		res.send('oh no!', err);
	});
});

router.get('/new', function(req, res){
	res.render('articles/new');
});

router.get('/:id', function(req, res){
	db.article.findOne({
		where: {id: req.params.id},
		include: [db.author]
		}).then(function(article){
		res.render('articles/single', {result: article});
	});
});

router.delete('/:id', function(req, res){
	console.log('delete route, ID', req.params.id);
	db.article.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(deleted){
		console.log('deleted =', deleted);
		res.send('success');
	}).catch(function(err){
		console.log("error", err);
		res.send('fail');
	});
});

module.exports = router;