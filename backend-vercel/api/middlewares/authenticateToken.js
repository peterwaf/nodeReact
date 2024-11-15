import admin from "firebase-admin";

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
        // If token is missing, respond with Unauthorized status
        return res.status(401).send("Unauthorized: No Token Provided");
    }
    
    admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            req.user = decodedToken; // Set user info from decoded token

            if (req.user) {
                // If token verification succeeded, proceed to next middleware
                next();
            } else {
                // If user info is missing, respond with Unauthorized status
                res.status(401).send("Unauthorized: Invalid Token Data");
            }
        })
        .catch((error) => {
            console.error('Error verifying token:', error);
            res.status(401).send("Unauthorized: Invalid Token");
        });
};

export default authenticateToken;
