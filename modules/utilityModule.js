import { log } from "console";
import { featureModel } from "../models/tripfeatureModel.js";
import { Response } from "../modules/supportModule.js";
import { deleteFile } from "../modules/supportModule.js";
import { readFileSync } from "fs";
import { request } from "http";

//create
export const createFeature = async (req, res, next) => {
  const { image, title, description } = req.body;
  try {
    if (req.file === undefined)
      return res.status(500).send(Response(null, "Image not found!", false));
    const result = await featureModel.create({
      purpose: req.params.feature,
      icon: `http://localhost:7000/featureImage/${req.file.filename}`,
      title: title,
      description: description,
    });
    console.log("result : ", result);
    const saveData = await result.save();
    if (saveData?._id)
      res
        .status(200)
        .send(Response(result, `New ${req.params.feature} added.`, true));
    else
      res
        .status(500)
        .send(Response(null, `${req.params.feature} not added!`, false));
  } catch (error) {
    next(error);
  }
};

const getResponseMessage = (result, res, feature) => {
  // console.log("result : ", result);
  if (result.length !== 0)
    return res
      .status(200)
      .send(Response(result, `All ${feature} are here...`, true));
  return res.status(500).send(Response(null, `${feature} not found!`, true));
};

export const showAll = async (req, res, next) => {
  try {
    console.log(req.params);
    const result = await featureModel.find({ purpose: req.params.feature });
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

// update
export const updateFeature = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const currentData = await featureModel.findOne({ _id: req.params.id });
    if (!currentData?._id)
      res
        .status(400)
        .send(Response(null, `${req.params.feature} not found!`, false));
    const data = {
      title: title,
      description: description,
    };
    const result = await featureModel.findOneAndUpdate(
      { _id: req.params.id, purpose: req.params.feature },
      data,
      { new: true }
    );
    res
      .status(200)
      .send(Response(result, `${req.params.feature} data is updated`, true));
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
      return res
        .status(500)
        .send(Response(null, `${req.params.feature} not found!`));

    const featureImage = data.icon.split("/")[4];
    deleteFile("features", featureImage);

    const result = await featureModel.findOneAndDelete({
      _id: id,
    });
    if (result) {
      return res
        .status(200)
        .send(Response(null, `${feature} deleted successfully.`, true));
    }
  } catch (error) {
    next(error);
  }
};

// getting all feature options Together
export const getAllFeature = async (req, res, next) => {
  try {
    console.log(req.params);
    const result = await featureModel.find({});
    getResponseMessage(result, res, "All features");
  } catch (error) {
    next(error);
  }
};
