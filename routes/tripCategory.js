import { tripDetails } from "../schema/model.js";

//creating Travel Category
export const createTripData = async (req, res) => {
  try {
    const tripData = await tripDetails({
      purpose: "Category",
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
    });
    console.log(tripData);
    const result = await tripData.save();
    res.send({
      data: null,
      message: 'new category added',
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

//getting Travel Category
export const getTripData = async (req, res) => {
  const data = await tripDetails.find({
    purpose: "Category"
  });
  try {
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

//modifying Travel Type
export const modifyTripData = async (req, res) => {
  try {
    const modifiedTripData = await tripDetails.findByIdAndUpdate(req.params.id, req.body);
    const modifiedResult = await modifiedTripData.save();
    res.send({
      data: null,
      message: 'category updated',
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

//deleting Travel Type
export const deleteTrip = async (req, res) => {
  try {
    const toBeDeletedTrip = await tripDetails.findByIdAndDelete(req.params.id);

    if (!toBeDeletedTrip) res.status(404).send("No item found");
    res.status(200).send({
      data: null,
      message: 'category deleted',
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
};
