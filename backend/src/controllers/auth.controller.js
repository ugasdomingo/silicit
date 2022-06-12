//Tols Import ***************
import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";


//Register Controller ***************
export const register = async (req, res) => {

  const { name, email, password, subscription } = req.body;

  //unique email validation 
  let findUser = await User.findOne({ email });
  if (findUser) return res.status(400).json({error: "User already exists"});

  //Create and save a new User 
  const user = new User({
    name,
    email,
    password,
    subscription,
  });

  user.save()
    .then((user) => {res.status(201).json({ user });})
    .catch((err) => {res.status(500).json({ errors: err });}
  );
};


//Login Controller ***************
export const login = (req, res) => {

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
        
      //Validate Crendentials
      if (!user) return res.status(404).json({ error: "User not found" });

      if (!user.comparePassword(password))
        return res.status(400).json({ error: "Password is incorrect" })
      ;

      //Create and send a new Token
      const { token, expiresIn } = generateToken(user);
      generateRefreshToken(user, res);

      return res.status(200).json({ token, expiresIn });
    })
    .catch((err) => {res.status(500).json({ error: err });}
  );
};


//Refresh Token Controller ***************
export const refreshToken = (req, res) => {
  
  const cookiesToken = req.cookies.refreshToken;
  if (!cookiesToken) return res.status(401).json({ error: "No token" });

  const { userId } = jwt.verify(cookiesToken, process.env.JWT_REFRESH);
  if (!userId) return res.status(401).json({ error: "Invalid token" });

  const { token, expiresIn } = generateToken(userId);
  res.status(200).json({ token, expiresIn });
}


//Logout Controller ***************
export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successful" });
}