// import admin from "firebase-admin";
// const authenticateToken = (req, res, next) => {
//     const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//     if (!token) return res.sendStatus(401); // Unauthorized
//     admin.auth().verifyIdToken(token)
//         .then((decodedToken) => {
//             req.user = decodedToken; //used info in token
//             next(); // Proceed to the next middleware or route handler
//         })
//         .catch((error) => {
//             console.error('Error verifying token:', error);
//             res.sendStatus(403); // Forbidden
//         });
// };

// export { authenticateToken };