import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyC27jrsPXGElrwoxAqRvzSQyfYs20q35tM",
  authDomain: "finances-3b59b.firebaseapp.com",
  projectId: "finances-3b59b",
  storageBucket: "finances-3b59b.firebasestorage.app",
  messagingSenderId: "347893581675",
  appId: "1:347893581675:web:8f58fc52c4cecda1292e2e",
  measurementId: "G-5GWPC8VBJE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);