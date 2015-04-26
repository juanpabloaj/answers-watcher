var Tutum = require('tutum');
var Firebase = require('firebase');

var config = require('./config');

var tutum = new Tutum(config.tutum);
var firebase = new Firebase(config.firebaseUrl);

function start_container(){
  tutum.get('/container', function(err, res){
    containers = res.objects;
    for (var i = 0, l = containers.length; i < l; i ++) {
      container = containers[i];
      if ( container.state == 'Stopped' ) {

        uuid = container.uuid;
        tutum.post('/container/' + uuid + '/start', function(err, res){
        });

      }
    }
  });
}

var answersRef = firebase.child('answers');

answersRef.on('child_added', function(snapshot){
  var value = snapshot.val();
  console.log("Added answers: " + value);
  start_container();
});
