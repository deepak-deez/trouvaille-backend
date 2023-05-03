import { tripPackage } from "../models/tripPackageModel.js";
// import multer from "multer";
import { readFileSync } from "fs";
import { Response, tripPackageObject } from "./supportModule.js";
import { nextTick } from "process";

// export const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// export const image = multer({ storage: storage });

//creating trip packages
export const createTripPackage = async (req, res, next) => {
  console.log(req.body);
  const filePath =
    `./database/images/${req.params.trip}/` + req.file.originalname;
  let imageString = readFileSync(filePath);
  console.log(imageString);
  let encodeImage = imageString.toString("base64");
  let bufferImage = Buffer.from(encodeImage, "base64");

  try {
    const packages = await tripPackage(
      tripPackageObject(bufferImage, req.body)
    );
    const result = await packages.save();

    res.send(Response(result, 200, `New ${req.params.trip} added.`, true));
  } catch (error) {
    next(error);
  }
};

//getting trip packages
export const getTripPackage = async (req, res) => {
  console.log("get trip package called");
  try {
    const result = await tripPackage.find({});
    console.log(result);
    if (result.length !== 0)
      res.send(
        Response(result, 200, `All ${req.params.trip} are here...`, true)
      );
    else res.send(Response(null, 500, `${req.params.trip} not found!`, true));
  } catch (error) {
    next(error);
  }
};

//modifying trip packages
export const updatePackage = async (req, res, next) => {
  let bufferImage;
  if (req.file !== undefined) {
    const filePath =
      `./database/images/${req.params.trip}/` + req.file.originalname;
    let imageString = readFileSync(filePath);
    let encodeImage = imageString.toString("base64");
    bufferImage = Buffer.from(encodeImage, "base64");
  }

  let data = tripPackageObject(bufferImage, req.body);
  for (let key in data) {
    if (data[key] === undefined) delete data[key];
  }
  if (data.image[data] === undefined) delete data.image;
  try {
    const result = await tripPackage.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: data,
      },
      { new: true }
    );
    res.send(Response(result, 200, `${req.params.trip} data is updated`, true));
  } catch (err) {
    next(err);
  }
};

//deleting trip package
export const deletePackage = async (req, res) => {
  try {
    const { trip, id } = req.params;
    const data = await tripPackage.findOne({ _id: id });
    if (data === null)
      return res.send(Response(null, 500, `${req.params.trip} not found!`));

    const result = await tripPackage.findOneAndDelete({ _id: id });
    if (result) {
      return res.send(
        Response(null, 200, `${trip} deleted successfully.`, true)
      );
    }
  } catch (error) {
    next(error);
  }
};
