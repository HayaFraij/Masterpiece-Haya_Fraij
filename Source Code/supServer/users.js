const express = require('express');
const cors = require('cors');
const router = express.Router();
const mongo = require('../supDB/users')


router.post('/default', (req, res) => {
    mongo.insertFirstUser((result) => {
      res.json(result);
    })
  });

  router.post("/CreateUser", (req, res) => {
    console.log('server', req.body);
    mongo.createUser(req.body, result => {
      res.json(result);
    });
   });
   
   router.post("/CreateServeceProvider", (req, res) => {
    console.log('server', req.body);
    mongo.createServeceProvider(req.body, result => {
      res.json(result);
    });
   });

   router.get('/listOfProviders/:listOfProviders', (req, res) => {
     let listOfProviders = req.params.listOfProviders
     mongo.listOfProviders(listOfProviders, result => {
       res.json(result)
       console.log("hayaa", result)
     })
   })

   router.post("/getUsers", (req, res) => {
    // console.log(req.body);
    mongo.getUsers(req.body, result => {
      res.json(result);
    });
   });

   
router.get('/', (req, res) => {
    mongo.getAll( result => {
        res.json(result)
    })
});


module.exports = router;