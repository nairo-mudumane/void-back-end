const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teste-ubi-1dc2a-default-rtdb.firebaseio.com",
});

const defaultAuth = admin.auth();
const defaultDatabase = admin.database();
const defaultFirestore = admin.firestore();

module.exports = {
  defaultAuth,
  defaultDatabase,
  defaultFirestore,
 
};
