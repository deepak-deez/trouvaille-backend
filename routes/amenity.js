import { tripDetails } from "../schema/model.js";

//creating Amenity
export const createAmenity = async (req, res) => {
  try {
    const amenity = await tripDetails({
      purpose: "Amenity",
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
    });
    const amenityResult = await amenity.save();
    res.send({
      data: null,
      message: "new amenity added",
      success: true,
    });
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
  const data = await tripDetails.find({
    purpose: "Amenity",
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

//modifying Amenity
export const modifyAmenity = async (req, res) => {
  try {
    const modifiedAmenity = await tripDetails.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    const modifiedResult = await modifiedAmenity.save();
    res.send({
      data: null,
      message: "amenity modified",
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

//deleting Amenity
export const deleteAmenity = async (req, res) => {
  try {
    const toBeDeletedAmenity = await tripDetails.findByIdAndDelete(
      req.params.id
    );

    if (!toBeDeletedAmenity) res.status(404).send("No item found");
    res.status(200).send({
      data: null,
      message: "amenity deleted",
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
