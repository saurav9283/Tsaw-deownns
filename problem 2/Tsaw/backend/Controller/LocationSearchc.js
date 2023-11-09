const locationModel = require("../Models/locationinsertModel.js");

exports.locationSearch = async (req, res) => {
  try {
    const { from, to } = req.body;
    console.log(req.body)
    const coordinates = await locationModel.findOne({ from,to });
    const fromArray = [coordinates.coordinateFrom2 ,coordinates.coordinateFrom1]
    const toArray = [coordinates.coordinateTo2,coordinates.coordinateTo1 ]
    res.json({fromArray,toArray});
  } catch (error) {
    console.log("here is the error", error);
    res.status(500).json({ error: "Error fetching coordinates" });
  }
};
