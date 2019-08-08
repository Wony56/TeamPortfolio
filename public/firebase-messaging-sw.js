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

const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  var notificationTitle = payload.notificaton.title;
  var notificationOptions = {
    body: payload.notificaton.title,
    icon: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBWe9Or.img?h=368&w=500&m=6&q=60&o=f&l=f&x=223&y=122'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

