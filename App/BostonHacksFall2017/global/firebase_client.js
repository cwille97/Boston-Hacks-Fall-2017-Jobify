import * as firebase from 'firebase';

var init = function() {
  var fb_config = {
    apiKey: "AIzaSyBNZK0RSrKy7OV012ITFfM0--EovP1Gmuo",
    authDomain: "bostonhacksfall2017.firebaseapp.com",
    databaseURL: "https://bostonhacksfall2017.firebaseio.com/",
    storageBucket: "gs://bostonhacksfall2017.appspot.com"
  }

  firebase.initializeApp(fb_config);
}

var acceptJob = function(jobId) {
  firebase.database().ref('/jobs/' + jobId + '/accepted').set(firebase.auth().currentUser.uid);
}

var submitJob = function(title, desc, wage) {
  // Get new key
  var newJobKey = firebase.database().ref().child('jobs').push().key;
  // Create job info
  var info = {};
  info['/jobs/' + newJobKey] = {
    title: title,
    desc: desc,
    wage: wage,
    user: firebase.auth().currentUser.uid,
    accepted: false,
    paid: false,
  }
  // Upload job info
  firebase.database().ref().update(info);
}

var currentUserId = function() {
  return firebase.auth().currentUser.uid;
}

var signOut = function() {
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  console.log(error)
});
}

var payJob = function(jobId, toUser, amountUSD) {
  firebase.database().ref('/jobs/' + jobId + '/paid').set(true);
  getOthersBalance(toUser, (res) => {
    if (res.error) console.log("Error updating user balance.");
    else {
      var balance = +(JSON.stringify(res.balance));
      balance += amountUSD;
      firebase.database().ref('/users/' + toUser + '/balance').set(balance);
    }
    done();
  });
}

var unacceptJob = function(jobId) {
  firebase.database().ref('/jobs/' + jobId + '/accepted').set(false);
}

var getAllJobs = function(done) {
  return firebase.database().ref('/jobs').once('value').then(function(snapshot) {
    done(snapshot.val());
  });
}

var deleteJob = function(jobId) {
  firebase.database().ref('/jobs/' + jobId).remove();
}

var register = function(email, password, done) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(userRecord) {
    done(false);

    // Create balance info
    var info = {};
    info['/users/' + userRecord.uid] = {
      balance: 0.00
    }
    // Upload job info
    firebase.database().ref().update(info);

  })
  .catch(function(error) {
    console.log(error)
    done(true);
  });
}

var login = function(email, password, done) {
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    return done(false);
  }).catch(function(error) {
    console.log(error);
    return done(true);
  });
}

var getOthersBalance = function(uid, done) {
  return firebase.database().ref('/users/' + uid + '/balance').once('value').then(function(snapshot) {
    done({balance: snapshot});
  })
  .catch(function(error) {
    console.log(error);
    done({error: "Error"});
  });
}

var getBalance = function(done) {
  return firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/balance').once('value').then(function(snapshot) {
    done({balance: snapshot, email: firebase.auth().currentUser.email});
  })
  .catch(function(error) {
    console.log(error);
    done({error: "Error"});
  });
}


exports.init = init;
exports.submitJob = submitJob;
exports.login = login;
exports.register = register;
exports.getAllJobs = getAllJobs;
exports.acceptJob = acceptJob;
exports.unacceptJob = unacceptJob;
exports.payJob = payJob;
exports.currentUserId = currentUserId;
exports.deleteJob = deleteJob;
exports.signOut = signOut;
exports.getBalance = getBalance;
exports.getOthersBalance = getOthersBalance;
