import { tripPackage } from "../../schema/tripModuleModel.js";
import { dataConnection } from "../../connection.js";

//creating trip packages
export const createTripPackage = async (req, res) => {
  const data = new tripPackage(req.body);
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

//getting trip packages
export const getTripPackage = async (req, res) => {
  const data = await tripPackage.find({});
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

//modifying trip packages
export const updatePackage = async (req, res) => {
  try {
    await tripPackage.findByIdAndUpdate(req.params.id, req.body);
    await tripPackage.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

//deleting trip package
export const deletePackage = async (req, res) => {
  try {
    const data = await tripPackage.findByIdAndDelete(req.params.id);

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
