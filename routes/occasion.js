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

export const occasionIcon = multer({ storage: storage });

//creating Occasion
export const createOccasion = async (req, res) => {
  let imageString = fs.readFileSync("images/" + req.file.originalname);
  let encodeImage = imageString.toString("base64");
  let bufferImage = Buffer.from(encodeImage, "base64");
  try {
    const occasion = await tripDetails({
      purpose: "Occasion",
      icon: {
        data: bufferImage,
        contentType: "image/png+jpg+jpeg",
      },
      title: req.body.title,
      description: req.body.description,
    });
    const result = await occasion.save();
    res.send({
      data: result,
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
    let modifiedResult = await modifiedOccasion.save();
    res.send({
      data: {
        purpose: "Occasion",
        icon: req.body.icon,
        title: req.body.title,
        description: req.body.description,
      },
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
      data: toBeDeletedOccasion,
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
