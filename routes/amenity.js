import { amenity } from "../model.js";
import { dataConnection } from "../connection.js";

//creating Amenity
export const createAmenity = async (req, res) => {
  const data = new amenity(req.body);
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

//getting Amenity
export const getAmenity = async (req, res) => {
  const data = await amenity.find({});
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

//modifying Amenity
export const modifyAmenity = async (req, res) => {
  try {
    await amenity.findByIdAndUpdate(req.params.id, req.body);
    await amenity.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

//deleting Amenity
export const deleteAmenity = async (req, res) => {
  try {
    const data = await amenity.findByIdAndDelete(req.params.id);

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