import { tripDetails } from "../schema/model.js";
import multer from "multer";
import fs from "fs";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const categoryIcon = multer({ storage: storage });

//creating Travel Category
export const createTripData = async (req, res) => {
  let imageString = fs.readFileSync("images/" + req.file.originalname);
  let encodeImage = imageString.toString("base64");
  let bufferImage = Buffer.from(encodeImage, "base64");
  try {
    const tripData = await tripDetails({
      purpose: "Category",
      icon: {
        data: bufferImage,
        contentType: "image/png+jpg+jpeg",
      },
      title: req.body.title,
      description: req.body.description,
    });
    console.log(tripData);
    const result = await tripData.save();
    res.send({
      data: result,
      message: "new category added",
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
    purpose: "Category",
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
    const modifiedTripData = await tripDetails.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    const modifiedResult = await modifiedTripData.save();
    res.send({
      data: {
        purpose: "Category",
        icon: req.body.icon,
        title: req.body.title,
        description: req.body.description,
      },
      message: "category updated",
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
      data: toBeDeletedTrip,
      message: "category deleted",
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
