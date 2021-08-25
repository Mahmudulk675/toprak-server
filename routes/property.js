const router = require("express").Router();
const Property = require("../models/PostData");


router.post("/add-post", async (req, res) => {
  const newProperty = req.body

  try {
    // Create new user
    const newPost = await new Property(newProperty);

    //   save and return response
    const property = await newPost.save();
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all-post", async (req, res) => {
  try {
    Property.find({})
      .then((result) => {
        res.send(result)
      })
  } catch (err) {
    console.log(error)
    res.status(500).json(err);
  }
});

router.post("/search-post", async (req, res) => {
  console.log(req.body);
  try {
    const property = await Property.find({ address: { $regex: req.body.location, $options: '$in' } });
    !property && res.status(400).json("No Property found");
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json(property);
  }
});

router.get("/single-property/:id", async (req, res) => {
  const id = req.params.id
  try {
    const singleProperty = await Property.findById(id)
    !singleProperty && res.status(400).json("No Post found");
    res.status(200).json(singleProperty);
  } catch (err) {
    console.log(error)
    res.status(500).json(err);
  }
});
module.exports = router;