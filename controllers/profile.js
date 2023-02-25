/**
 * It takes in a request and a response, and then it uses the database to select all the columns from
 * the users table where the id matches the id in the request. If the user exists, it returns the user,
 * otherwise it returns an error
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 * @param db - the database object
 */
const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
};
module.exports = {
  handleProfileGet: handleProfileGet,
};
