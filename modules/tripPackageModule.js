import { tripPackage } from "../models/tripPackageModel.js";
import { readFileSync } from "fs";
import { Response, tripPackageObject } from "./supportModule.js";
import { nextTick } from "process";

//creating trip packages

const makePackageData = (req) => {
  const profileimage = `http://localhost:7000/packageImage/${req.files[0].filename}`;
  const result = tripPackageObject(profileimage, req.body);

  result.tripHighlights.forEach((element, i) => {
    element.icon = `http://localhost:7000/packageImage/${
      req.files[i + 1].filename
    }`;
  });
  // console.log("data : ", result);
  return result;
};

export const createTripPackage = async (req, res, next) => {
  console.log("FILE : ", req.body);
  try {
    const { tripHighlights } = req.body;

    const result = await tripPackage(makePackageData(req));
    if (result?._id) {
      result.save();
      return res.send(
        Response(result, 200, `New ${req.params.trip} added.`, true)
      );
    }
    return res.send(
      Response(null, 500, `${req.params.trip} not added!`, false)
    );
  } catch (error) {
    next(error);
  }
};

//getting trip packages
export const getTripPackages = async (req, res, next) => {
  try {
    let result;
    if (req.type === "GET") {
      result = await tripPackage.find({});
    } else {
      result = await tripPackage.find(req.body.category);
    }
    if (result.length !== 0)
      res.send(
        Response(result, 200, `All ${req.params.trip} are here...`, true)
      );
    else res.send(Response(null, 500, `${req.params.trip} not found!`, true));
  } catch (error) {
    next(error);
  }
};

// getting a particular trip package details
export const getTripDetails = async (req, res, next) => {
  try {
    const result = await tripPackage.find({ _id: req.params.id });
    if (result.length !== 0)
      res.send(
        Response(result, 200, `Details of ${req.params.trip} are here...`, true)
      );
    else res.send(Response(null, 500, `${req.params.trip} not found!`, true));
  } catch (error) {
    next(error);
  }
};

//modifying trip packages
export const updatePackage = async (req, res, next) => {
  try {
    const currentData = await tripPackage.findOne({ _id: req.params.id });
    if (currentData === null)
      return res.send(
        Response(null, 200, `${req.params.trip} not found!`, false)
      );
    const result = makePackageData(req);
    console.log("result : ", result);
    const updatedResult = await tripPackage.findOneAndUpdate(
      { _id: req.params.id },
      result,
      { new: true }
    );
    if (updatedResult?._id)
      return res.send(
        Response(updatedResult, 200, `${req.params.trip} data is updated`, true)
      );
  } catch (err) {
    next(err);
  }
};

//deleting trip package
export const deletePackage = async (req, res, next) => {
  try {
    const { trip, id } = req.params;
    const data = await tripPackage.findOne({ _id: id });

    if (data === null)
      return res.send(Response(null, 500, `${req.params.trip} not found!`));

    const result = await tripPackage.findOneAndDelete({ _id: id });
    if (result?._id) {
      return res.send(
        Response(null, 200, `${trip} deleted successfully.`, true)
      );
    }
  } catch (error) {
    next(error);
  }
};
