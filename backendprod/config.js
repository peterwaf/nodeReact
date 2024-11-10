import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();
const serviceAccount = {
  "type":process.env.MY_APP_TYPE,
  "project_id":process.env.MY_APP_PROJECT_ID,
  "private_key_id":process.env.MY_APP_PRIVATE_KEY_ID,
  "private_key":process.env.MY_APP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email":process.env.MY_APP_CLIENT_EMAIL,
  "client_id":process.env.MY_APP_CLIENT_ID,
  "auth_uri":process.env.MY_APP_AUTH_URI,
  "token_uri":process.env.MY_APP_TOKEN_URI,
  "auth_provider_x509_cert_url":process.env.MY_APP_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url":process.env.MY_APP_CLIENT_X509_CERT_URL,
  "universe_domain":process.env.MY_APP_UNIVERSE_DOMAIN
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.MY_APP_STORAGE_BUCKET,
  app_name: process.env.MY_APP_APP_NAME
});

const db = admin.firestore();
const bucket = admin.storage().bucket();
const auth = admin.auth();
export { db, bucket, auth };


