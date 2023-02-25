/**
 * We're using the bcrypt library to compare the password entered by the user with the hashed password
 * stored in our database. If the password is correct, we return the user's information. If the
 * password is incorrect, we return an error
 * @param req - The request object.
 * @param res - the response object
 * @param db - the database connection
 * @param bcrypt - The bcrypt library
 */
const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};
module.exports = {
  handleSignin: handleSignin,
};
