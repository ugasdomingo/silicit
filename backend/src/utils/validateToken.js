//Tols Import ***************
import jwt from 'jsonwebtoken';


//Require Token ***************
export const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
  