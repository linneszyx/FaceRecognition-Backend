/**
 * We're using a transaction to insert the user's email and password into the login table, returning
 * the email, then using the email to insert the user's name and other details into the users table,
 * returning the user's details, and finally committing the transaction
 * @param req - The request object.
 * @param res - the response object
 * @param db - the database connection
 * @param bcrypt - the bcrypt library
 */
const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
    if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
    }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
};
module.exports = {
  handleRegister: handleRegister,
};
