// firebase service worker full configuration
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAfGwPoN39Jk6RHo_6vToU6s-1AAGQUHxo",
  authDomain: "movierecommender-2958a.firebaseapp.com",
  projectId: "movierecommender-2958a",
  storageBucket: "movierecommender-2958a.firebasestorage.app",
  messagingSenderId: "68197875118",
  appId: "1:68197875118:web:3beee93263625894ba9c3f",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
