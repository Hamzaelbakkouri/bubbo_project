import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firbaseCreds = require("./firebaseCreds.json");

initializeApp({
    credential: cert(firbaseCreds)
});

const db = getFirestore();

export default db;
