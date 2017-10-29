var express			= require('express');
var path			= require('path');
var bodyParser		= require('body-parser');


// REQUIRE
var admin 			= require('firebase-admin');
var serviceAccount	= require('./BostonHacksFall2017-b0fecd7664e8.json');

// SETUP
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bostonhacksfall2017.firebaseio.com/"
});

var database = admin.database();

//Get new job key
var newJobKey = database.ref().child('jobs').push().key;

var info = {};
info['/jobs/' + newJobKey] = {
	title: "Lawn Mowing",
	desc: "Hi I need my lawn mowed.",
	wage: "$10 / hour"
}

database.ref().update(info);

/* ADD USER
admin.auth().createUser({
  email: "jamespel@bu.edu",
  emailVerified: false,
  phoneNumber: "+17812589397",
  password: "testpassword",
  displayName: "Drew Pelusi",
  photoURL: "http://www.example.com/12345678/photo.png",
  disabled: false
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });
*/







var app	= express();
app.set('port', process.env.port || 8000);

// Public
app.use(express.static(path.join(__dirname, 'public')));
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
	return res.send("Hello");
});


// Start Server
var server = app.listen(app.get('port'), function() {
	console.log("Server started.");
});

module.exports = app;