var friends = require("../app/data/friends.js");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var diffArr = [];
    for(let i=0; i<friends.length; i++){
      var diff=0;
      for(let j=0; j<friends[i].answers; j++){
        if (req.body.answers > friends[i].answers){
          diff += (req.body.answers - friends[i].answers);
        }
        else{
          diff += (friends[i].answers - req.body.answers)
        }
      }
      diffArr.push(diff);
    }
    var lowestDiff = 50;
    var bestFriend;
    for(let k=0; k<diffArr.length; k++){
      if(diffArr[k] < lowestDiff) {
        lowestDiff = diffArr[k];
        bestFriend = k;
      }
    }
    res.json(friends[bestFriend]);
    friends.push(req.body);
  });
}