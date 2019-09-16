const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://Dennis:mamakevin@cluster0-yxgtg.mongodb.net/test?retryWrites=true&w=majority',{  useNewUrlParser:true })
.then(()=>{
	console.log('You have successfully connected to the database')
})
.catch(err =>{
	console.log('you were not able to connect');
	console.log(err);
})
//response headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
  });
  const Recipe = require('./models/Recipe');
  app.use(bodyParser.json())

  //create a recipe
  app.post('/api/recipes',(req, res, next)=>{
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    })
    recipe.save().then(()=>{
        res.status(201).json({
            message: 'Recipe saved successfully!'
        }).catch((err)=>{
            res.status(400).json({
                error:err
            });
        });
    })

  });

  //get a single recipe
  app.get('/api/recipes/:id',(req,res, next)=>{
    Recipe.findOne({
        _id: req.params.id
    }).then((recipe)=>{
        res.status(200).json(recipe);
    });
  });

  //update a recipe
  app.put('/api/recipes/:id',(req, res, next)=>{
    const recipe = new Recipe({
        _id: req.params.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });
    Recipe.updateOne({ _id:req.params.id }, recipe).then(()=>{
        res.status(201).json({
            message: 'Recipe update succefully!'
        }).catch((err)=>{
            res.status(400).json({
                error:err
            })
        })
    })
  });
  //delete a recipe
  app.delete('/api/recipes/:id',(req, res, next)=>{
    Recipe.deleteOne({ _id: req.params.id }).then(()=>{
        res.status(200).json({
            message: 'Recipe successfully deleted!'
        });
    }).catch((error)=>{
        res.status(400).json({
            error: error
        })
    });

  });

  //get all recipes
  app.use('/api/recipes',(req, res, next)=>{
      Recipe.find().then((recipes)=>{
        res.status(200).json(recipes);
      }).catch((err)=>{
          error: err
      });
  })



module.exports = app


