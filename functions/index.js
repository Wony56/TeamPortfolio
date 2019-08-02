const functions = require('firebase-functions');

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ssafy-web-pjt.firebaseio.com"
});
var db = admin.firestore();


exports.createPost = functions.firestore
.document('posts/{Id}')
.onCreate((snap, context) => {
    db.collection('tokens').get().then((snapshot) => {
            snapshot.forEach(doc => {
                if (doc.data()['token']) {
                    var message = {
                        data: {
                            title: 'New',
                            body: 'New Post'
                        },
                        token: doc.data()['token']
                    };
                    admin.messaging().send(message)
                        .then((response) => {
                            console.log('Successfully sent message:', response);
                        })
                        .catch((error) => {
                            console.log('Error sending message:', error);
                        });
                }
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
});

exports.createPortfolios = functions.firestore
.document('portfolios/{Id}')
.onCreate((snap, context) => {
    db.collection('tokens').get().then((snapshot) => {
            snapshot.forEach(doc => {
                if (doc.data()['token']) {
                    var message = {
                        data: {
                            title: 'New',
                            body: 'New Portfolio'
                        },
                        token: doc.data()['token']
                    };
                    admin.messaging().send(message)
                        .then((response) => {
                            console.log('Successfully sent message:', response);
                        })
                        .catch((error) => {
                            console.log('Error sending message:', error);
                        });
                }
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
});