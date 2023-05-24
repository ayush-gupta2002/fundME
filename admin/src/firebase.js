import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRcjiB44GmG0bSzyRssj1ShLVdnTSar-s",
  authDomain: "fundme-6ee6d.firebaseapp.com",
  projectId: "fundme-6ee6d",
  storageBucket: "fundme-6ee6d.appspot.com",
  messagingSenderId: "658154070082",
  appId: "1:658154070082:web:30427db2d4cb113377cddb",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
