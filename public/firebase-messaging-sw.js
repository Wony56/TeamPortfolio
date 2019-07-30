importScripts("https://www.gstatic.com/firebasejs/5.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.10.1/firebase-messaging.js");

const config = {
	apiKey: "AIzaSyD4WyDVLvJV1ZXAH2KOUQDs2JFtQjqv3Do",
	authDomain: "ssafy-web-pjt.firebaseapp.com",
	databaseURL: "https://ssafy-web-pjt.firebaseio.com",
	projectId: "ssafy-web-pjt",
	storageBucket: "ssafy-web-pjt.appspot.com",
	messagingSenderId: "363817638878",
	appId: "1:363817638878:web:aea49aa578e86b59"
}

firebase.initializeApp(config)

const messaging = firebase.messaging({
    'messagingSenderId': "363817638878",
});

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  var notificationTitle = '알림';
  var notificationOptions = {
    body: '새글 등장',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});


// const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler(function(payload){
 
//     const title = "Hello World";
//     const options = {
//             body: payload.data.status
//     };
 
//     return self.registration.showNotification(title,options);
// });

