import Firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyCCZhYBIXedwG1Mh7uHemMrN1qlgdk-Sag',
    databaseURL: 'https://chat-now-d2f57.firebaseio.com/',
    projectId: 'chat-now-d2f57',
    appId: '1:480861609902:android:778d68a665917f9a64723f',
};


export default Firebase.initializeApp(firebaseConfig)
