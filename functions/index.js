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
    let data = snap.data();
    const payload = {
        notification:{
            title: 'Post가 등록되었습니다.',
            body: `@${data.author.name} 님께서 글을 작성하셨습니다.`,
            icon:'https://i.imgur.com/P0BSbsJ.png'
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
    let data = snap.data();
    const payload = {
        notification:{
            title: 'Portfolio가 등록되었습니다.',
            body: `@${data.author.name} 님께서 포트폴리오를 작성하셨습니다.`,
            icon:'https://i.imgur.com/P0BSbsJ.png'
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
    let data = snap.data();
    const payload = {
        notification:{
            title: 'New 댓글',
            body: `@${data.author} 님께서 댓글을 작성하셨습니다.`,
            icon:'https://i.imgur.com/P0BSbsJ.png'
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
