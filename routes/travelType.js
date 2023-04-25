import { travelType } from "../model.js";
import { dataConnection } from "../connection.js";

//creating Travel type
export const createTravelType = async (req, res) => {
  const data = new travelType(req.body);
  console.log(data);
  try {
    await data.save();
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
export const getTravelType = async (req, res) => {
  const data = await travelType.find({});
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
    await travelType.findByIdAndUpdate(req.params.id, req.body);
    await travelType.save();
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
export const deleteTravelType = async (req, res) => {
  try {
    const data = await travelType.findByIdAndDelete(req.params.id);

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

