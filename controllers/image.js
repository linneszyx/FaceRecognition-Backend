/**
 * It takes in the id of the user, increments the entries of the user by 1 and returns the entries of
 * the user
 * @param req - request object
 * @param res - response
 * @param db - the database connection
 */
const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: "92dd1c6bc3c241e0a81e9bbee3cc2613",
});
const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: "face-detection",
        name: "face-detection",
        version: "6dc7e46bc9124c5c8824be4822abe105",
        type: "visual-detector",
      },
      req.body.input
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};
module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
