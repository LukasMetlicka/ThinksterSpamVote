var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var Poll = mongoose.model("Poll");

router.get('/showPolls', function(req, res, next) {
    Poll.find(function(err, polls) {
        if(err){ return next(err); }
        res.json(polls);
    });
});

router.post("/showPolls", function(req, res, next) {
    var poll = new Poll(req.body);
    poll.save(function(err, poll){
        if(err){ next(err); }
        res.json(poll);
    })
});

router.param('poll', function(req, res, next, id){
   var query = Poll.findById(id);

    query.exec(function(err, poll){
        if(err){ next(err); }
        if(!poll){ next(new Error("Can't find Poll!")); }

        req.poll = poll;
        return next();
    });


});

router.put('/poll/:poll/redUpvote', function(req, res, next){
   req.poll.redUpvote(function(err, poll){
        if(err){ return next(err); }
       res.json(poll);
   });
});

router.put('/poll/:poll/blueUpvote', function(req, res, next){
    req.poll.blueUpvote(function(err, poll){
        if(err){ return next(err); }
        res.json(poll);
    });
});

router.post("/poll/:poll/delete", function(req, res, next){

    res.json(req.pollID);
       //.remove().success(function(err, req){
       //if(err){ return next(err); }
       //res.redirect("/showPolls");
   //});
});

//Tester
router.get('/poll/:poll', function(req, res){
    res.json(req.poll);
});
