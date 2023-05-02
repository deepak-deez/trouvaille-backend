import { tripDetails } from "../schema/model.js";
import { Response } from "../modules/supportModule.js";
// import * as fs from "fs/promises";
import { readFileSync } from "fs";

// export const readImageFile = async (image) => {
//   console.log("Path:", image);
//   const data = await fs.readFile(image, "utf-8");
//   console.log("data : ", data);
//   return data;
// };

//create
export const createAmenity = async (req, res, next) => {
  console.log("create function called!");
  const filePath = "./database/images/" + req.file.originalname;
  let imageString = readFileSync(filePath);
  console.log(imageString);
  let encodeImage = imageString.toString("base64");
  let bufferImage = Buffer.from(encodeImage, "base64");
  //   console.log("Buffer :", bufferImage);
  try {
    const result = await tripDetails({
      purpose: req.params.feature,
      icon: {
        data: bufferImage,
        contentType: "image/png+jpg+jpeg",
      },
      title: req.body.title,
      description: req.body.description,
    });
    console.log(result);
    const saveData = await result.save();
    if (saveData?._id)
      res.send(Response(result, 200, "New amenity added.", true));
    else
      res.send(Response(null, 500, `${req.params.feature} not added!`, false));
  } catch (error) {
    next(error);
  }
};

//get
export const getAmenity = async (req, res, next) => {
  try {
    const result = await tripDetails.find({ purpose: req.params.feature });
    if (result.length !== 0)
      res.send(Response(result, 200, "All amemities are here...", true));
    else res.send(Response(null, 500, "Amenity not found!", true));
  } catch (error) {
    next(error);
  }
};
