export const register = (req, res) => {
  res.json({ message: 'Register success' });
  //Get data and save to database
  /* const { name, email, password, subscription } = req.body;
  const user = new User({
    name,
    email,
    password,
    subscription,
  });
  user.save()
    .then((user) => {res.json({ user });})
    .catch((err) => {res.status(400).json({ errors: err });}
  ); */
};


export const login = (req, res) => {
  res.json({ message: 'API Login' });
};
