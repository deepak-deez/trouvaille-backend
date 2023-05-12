import { featureModel } from "../models/tripfeatureModel.js";
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
export const createFeature = async (req, res, next) => {
  console.log("create function called!");
  // const filePath =
  //   `./database/images/${req.params.feature}/` + req.file.originalname;
  // let imageString = readFileSync(filePath);
  // console.log("imageString :", imageString);
  // let encodeImage = imageString.toString("base64");

  //   console.log("Buffer :", bufferImage);
  try {
    let bufferImage = Buffer.from(req.body.icon.slice(22), "base64");
    const result = await featureModel({
      purpose: req.params.feature,
      icon: {
        data: bufferImage,
        contentType: "image/png+jpg+jpeg",
      },
      title: req.body.title,
      description: req.body.description,
    });
    console.log("result : ", result);
    const saveData = await result.save();
    if (saveData?._id)
      res.send(Response(result, 200, `New ${req.params.feature} added.`, true));
    else
      res.send(Response(null, 500, `${req.params.feature} not added!`, false));
  } catch (error) {
    next(error);
  }
};

//get
export const showAll = async (req, res, next) => {
  try {
    const result = await featureModel.find({ purpose: req.params.feature });
    if (result.length !== 0)
      res.send(
        Response(result, 200, `All ${req.params.feature} are here...`, true)
      );
    else
      res.send(Response(null, 500, `${req.params.feature} not found!`, true));
  } catch (error) {
    next(error);
  }
};

// update
export const updateFeature = async (req, res, next) => {
  try {
    const result = await featureModel.findOneAndUpdate(
      { _id: req.params.id, purpose: req.params.feature },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      },
      { new: true }
    );
    res.send(
      Response(result, 200, `${req.params.feature} data is updated`, true)
    );
  } catch (err) {
    next(err);
  }
};

// delete
export const deleteFeature = async (req, res, next) => {
  console.log("deleteFeature called");
  try {
    const { feature, id } = req.params;
    const data = await featureModel.findOne({
      _id: id,
      purpose: req.params.feature,
    });
    if (data === null)
      return res.send(Response(null, 500, `${req.params.feature} not found!`));

    const result = await featureModel.findOneAndDelete({
      _id: id,
    });
    if (result) {
      return res.send(
        Response(null, 200, `${feature} deleted successfully.`, true)
      );
    }
  } catch (error) {
    next(error);
  }
};
