import { log } from "console";
import { featureModel } from "../models/tripfeatureModel.js";
import { Response } from "../modules/supportModule.js";
import cloudinary from "./cloudinary.js";
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
  const { image, title, description } = req.body;
  try {
    const data = await cloudinary.uploader.upload(image, {
      folder: `${req.params.feature}`,
    });
    const result = await featureModel.create({
      purpose: req.params.feature,
      icon: {
        public_id: data.public_id,
        url: data.secure_url,
      },
      title: title,
      description: description,
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

const getResponseMessage = (result, res, feature) => {
  console.log("result : ", result);
  if (result.length !== 0)
    return res.send(Response(result, 200, `All ${feature} are here...`, true));
  return res.send(Response(null, 500, `${feature} not found!`, true));
};

export const showAll = async (req, res, next) => {
  try {
    console.log(req.params);
    const result = await featureModel.find({});
    getResponseMessage(result, res, "features");
  } catch (error) {
    next(error);
  }
};
//get
export const showTravelAmenityOccasion = async (req, res, next) => {
  try {
    console.log(req.params);
    const result = await featureModel.find({
      purpose: {
        $in: [req.params.feature1, req.params.feature2, req.params.feature3],
      },
    });
    console.log(result);
    getResponseMessage(result, res, "features");
  } catch (error) {
    next(error);
  }
};

//filter
export const filterTripList = async (req, res, next) => {
  const tripNames = req.body;
  console.log(tripNames);
  try {
    const result = await featureModel.find({
      purpose: req.params.feature,
      title: { $in: tripNames },
    });
    getResponseMessage(result, res, req.params.feature);
  } catch (error) {
    next(error);
  }
};

// update
export const updateFeature = async (req, res, next) => {
  try {
    const { image, title, description } = req.body;
    const currentData = await featureModel.findOne({ _id: req.params.id });
    const data = {
      title: title,
      description: description,
    };
    if (image !== "") {
      const ImgId = currentData.icon.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader.upload(image, {
        folder: `${req.params.feature}`,
      });

      data.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }
    const result = await featureModel.findOneAndUpdate(
      { _id: req.params.id, purpose: req.params.feature },
      data,
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
      purpose: feature,
    });
    if (data === null)
      return res.send(Response(null, 500, `${req.params.feature} not found!`));

    const imgId = data.icon.public_id;
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }

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
