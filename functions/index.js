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
.onCreate((snap) => {
    const payload = {
        notification:{
            title: '새글',
            body: '새글이 등록되었습니다.'
        }
    }
    db.collection('tokens').get().then((snapshot)=>{
        snapshot.forEach(doc => {
          console.log(doc.data()['token'])
          admin.messaging().sendToDevice(doc.data()['token'], payload);
        })
    })
});

exports.createPortfolio = functions.firestore
.document('portfolios/{Id}')
.onCreate((snap) => {
    const payload = {
        notification:{
            title: '새 포트폴리오',
            body: '새 포트폴리오가 등록되었습니다.'
        }
    }
    db.collection('tokens').get().then((snapshot)=>{
        snapshot.forEach(doc => {
          console.log(doc.data()['token'])
          admin.messaging().sendToDevice(doc.data()['token'], payload);
        })
    })
});

exports.createComment = functions.firestore
.document('comments/{Id}')
.onCreate((snap) => {
    const payload = {
        notification:{
            title: 'New 댓글',
            body: '새로운 댓글이 등록되었습니다.'
        }
    }
    db.collection('tokens').get().then((snapshot)=>{
        snapshot.forEach(doc => {
            if(doc.data()['tier']=='diamond'){
                console.log(doc.data()['token'])
                admin.messaging().sendToDevice(doc.data()['token'], payload);
            }
        })
    })
});
