import { tripPackage } from "../models/tripPackageModel.js";
import { readFileSync } from "fs";
import { Response, tripPackageObject } from "./supportModule.js";
import { nextTick } from "process";
import { deleteFile } from "./supportModule.js";

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
      return res
        .status(200)
        .send(Response(result, `New ${req.params.trip} added.`, true));
    }
    return res
      .status(500)
      .send(Response(null, `${req.params.trip} not added!`, false));
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
      res
        .status(200)
        .send(Response(result, `All ${req.params.trip} are here...`, true));
    else
      res
        .status(500)
        .send(Response(null, `${req.params.trip} not found!`, true));
  } catch (error) {
    next(error);
  }
};

// getting a particular trip package details
export const getTripDetails = async (req, res, next) => {
  try {
    const result = await tripPackage.find({ _id: req.params.id });
    if (result.length !== 0)
      res.status(200).send(
        Response(
          result,

          `Details of ${req.params.trip} are here...`,
          true
        )
      );
    else
      res
        .status(500)
        .send(Response(null, `${req.params.trip} not found!`, true));
  } catch (error) {
    next(error);
  }
};

//modifying trip packages
export const updatePackage = async (req, res, next) => {
  try {
    const currentData = await tripPackage.findOne({ _id: req.params.id });
    if (currentData === null)
      return res
        .status(200)
        .send(Response(null, `${req.params.trip} not found!`, false));
    const result = makePackageData(req);
    console.log("result : ", result);
    const updatedResult = await tripPackage.findOneAndUpdate(
      { _id: req.params.id },
      result,
      { new: true }
    );
    if (updatedResult?._id)
      return res.status(200).send(
        Response(
          updatedResult,

          `${req.params.trip} data is updated`,
          true
        )
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
      return res
        .status(500)
        .send(Response(null, `${req.params.trip} not found!`));

    const tripImage = data.image.split("/")[4];

    deleteFile(`./database/images/packages/${tripImage}`);
    data.tripHighlights.forEach((element) => {
      const icon = element.icon.split("/")[4];
      deleteFile(`./database/images/packages/${icon}`);
    });

    const result = await tripPackage.findOneAndDelete({ _id: id });
    if (result?._id) {
      return res
        .status(200)
        .send(Response(null, `${trip} deleted successfully.`, true));
    }
  } catch (error) {
    next(error);
  }
};
