import app from "../server.js";
import { tripCategory } from "../schema/model.js";
import { dataConnection } from "../connection.js";

//creating Travel type
export const createTripData = async (req, res) => {
  const data = new tripCategory(req.body);
  console.log(data);
  try {
    await data.save({
      purpose:"Catagory",
      image: req.body.image,
      title: req.body.title,
      description: req.body.description
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.messge,
      success: false,
    });
  }
};

//getting Travel type
export const getTripData = async (req, res) => {
  const data = await tripCategory.find({});
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
export const modifyTripData = async (req, res) => {
  try {
    await tripCategory.findByIdAndUpdate(req.params.id, req.body);
    await tripCategory.save();
    res.send(data);
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
    const data = await tripCategory.findByIdAndDelete(req.params.id);

    if (!data) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error,
      success: false,
    });
  }
};

