import { tripDetails } from "../schema/model.js";

//creating Travel type
export const createTravelType = async (req, res) => {
  try {
    const tripType = await tripDetails({
      purpose: "TravelType",
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
    });
    console.log(tripType);
    const result = await tripType.save();
    console.log(result);
    res.send({
      data: result,
      message: 'New Travel type added',
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

//getting Travel type
export const getTravelType = async (req, res) => {
  const data = await tripDetails.find({
    purpose: "TravelType"
  });
  try {
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.messge,
      success: false,
    });
  }
};

//modifying Travel Type
export const modifyTravelType = async (req, res) => {
  try {
    const modifiedTravelType = await tripDetails.findByIdAndUpdate(req.params.id, req.body);
    const modifiedResult = await modifiedTravelType.save();
    res.send({
      data: {
        purpose: "TravelType",
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
      },
      message: 'travel type modified',
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
export const deleteTravelType = async (req, res) => {
  try {
    const toBeDeletedType = await tripDetails.findByIdAndDelete(req.params.id);

    if (!toBeDeletedType) res.status(404).send("No item found");
    res.status(200).send({
      data: toBeDeletedType,
      message: 'Travel type deleted',
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error,
      success: false,
    });
  }
};

