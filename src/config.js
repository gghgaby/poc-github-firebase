const firebaseConfig = {
  apiKey: String(process.env.API_KEY),
  authDomain: String(process.env.AUTH_DOMAIN),
  projectId: String(process.env.PROJECT_ID),
  storageBucket: String(process.env.STORAGE_BUCKET),
  messagingSenderId: String(process.env.MESSAGING_SENDER_ID),
  appId: String(process.env.APP_ID),
  measurementId: String(process.env.MEASUREMENT_ID)
};
export default firebaseConfig;

/*const firebaseConfig = {
  apiKey: "AIzaSyAqET6uC4Sb4TYnGeu5DVdkY6kTXJvZp-0",
  authDomain: "pied-piper-dev.firebaseapp.com",
  projectId: "pied-piper-dev",
  storageBucket: "pied-piper-dev.appspot.com",
  messagingSenderId: "129688927360",
  appId: "1:129688927360:web:a734f9f64ea5b6f40a7a65",
  measurementId: "G-80M0VF8CDT"
};
export default firebaseConfig;*/