//Tols Import ***************
import jwt from "jsonwebtoken";

//Generate Token ***************
export const generateToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
  });
  return {token, expiresIn: parseInt(process.env.JWT_EXPIRES_IN)};
}

export const generateRefreshToken = (user, res) => {
  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH, {
    expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES),
  });
  //Guardar en Cookies *****************
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !(process.env.MODO === "developer"),
    expires: new Date(Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRES) * 1000),
  });
}