const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


exports.newPost = functions.firestore
.document('posts/{postId}')
.onCreate((event) => {
    const payload = {
        notification:{
            title: '새글',
            body: '새글등록'
        }
    }
    
    firestore.collection('tokens').get().then((data)=>{
        data.forEach(doc => {
          console.log(doc.token)
          return admin.messaging().newPost(doc.token,payload);
        })
    })
})