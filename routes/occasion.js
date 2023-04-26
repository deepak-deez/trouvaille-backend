import { tripDetails } from "../schema/model.js";

//creating Occasion
export const createOccasion = async (req, res) => {
  try {
    const occasion = await tripDetails({
      purpose: "Occasion",
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
    });
    const result = await occasion.save();
    res.send({
      data: null,
      message: 'new occasion added',
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

//getting Occasion
export const getOccasion = async (req, res) => {
  const data = await tripDetails.find({
    purpose: "Occasion"
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

//modifying Occasion
export const modifyOccasion = async (req, res) => {
  try {
    const modifiedOccasion = await tripDetails.findByIdAndUpdate(req.params.id, req.body);
    const modifiedResult = await modifiedOccasion.save();
    res.send({
      data: null,
      message: 'occasion modified',
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

//deleting Occasion
export const deleteOccasion = async (req, res) => {
  try {
    const toBeDeletedOccasion = await tripDetails.findByIdAndDelete(req.params.id);

    if (!toBeDeletedOccasion) res.status(404).send("No item found");
    res.status(200).send({
      data: null,
      message: 'occasion deleted',
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
