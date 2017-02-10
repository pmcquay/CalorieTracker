var express = require('express');
var neDB = require('nedb');
var bodyParser = require('body-parser');

var userData = new neDB({ filename: 'data/userData.db', autoload: true });

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get("/api/data/:id", function (request, response) {
  userData.findOne({ _id: request.params.id }, function (err, doc) {
    if(err) {
      response.status(500).send(err.message);
      return;
    }

    if (doc === null) {
      userData.insert({ _id: request.params.id }, function (err, newDoc) {
        if(err) {
          response.status(500).send(err.message);
          return;
        }
        
        response.json(newDoc);
      });
    } else {
      response.json(doc);
    }
  });
});

app.post("/api/data/", function (request, response) {
  userData.update({ _id: request.body._id }, request.body, {}, function (err, numReplaced) {
    if(err) {
      response.status(500).send(err.message);
      return;
    }

    response.sendStatus(200);
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + listener.address().port);
});
