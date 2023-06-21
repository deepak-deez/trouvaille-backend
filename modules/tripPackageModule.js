import { TripPackage } from "../models/TripPackageModel.js";
import { readFileSync } from "fs";
import {
  Response,
  TripPackageObject,
  updateTripPackageObject,
} from "./supportModule.js";
import { nextTick } from "process";
import { deleteFile } from "./supportModule.js";
import { FeatureModel } from "../models/tripFeatureModel.js";

const getFeatures = async (data) => {
  const features = [
    ...data.occasions,
    ...data.tripCategory,
    ...data.amenities,
    data.travelType,
  ];

  const result = await FeatureModel.find({ title: { $in: features } });
  return result;
};

const makePackageData = async (req) => {
  const profileimage = `http://localhost:7000/packageImage/${req.files[0].filename}`;
  const result = TripPackageObject(profileimage, req.body);

  result.tripHighlights.forEach((element, i) => {
    element.icon = `http://localhost:7000/packageImage/${
      req.files[i + 1].filename
    }`;
  });
  const featureData = await getFeatures(result);
  result.features = [...featureData];
  return result;
};

const updatePackageData = async (req) => {
  let parsedIndexes = JSON.parse(req.body.indexes);
  let profileimage = req.body.images[0];
  if (parsedIndexes.includes(0))
    profileimage = `http://localhost:7000/packageImage/${req.files[0].filename}`;
  else profileimage = req.body.images[0];

  const result = updateTripPackageObject(profileimage, req.body);
  let indexArray = parsedIndexes;

  if (indexArray.includes(0)) {
    indexArray.shift();
    indexArray.forEach((element, i) => {
      result.tripHighlights[
        element - 1
      ].icon = `http://localhost:7000/packageImage/${
        req.files[i + 1].filename
      }`;
    });
  } else {
    indexArray.forEach((element, i) => {
      result.tripHighlights[
        element - 1
      ].icon = `http://localhost:7000/packageImage/${req.files[i].filename}`;
    });
  }

  const featureData = await getFeatures(result);
  result.features = [...featureData];
  console.log(result);
  return result;
};

export const createTripPackage = async (req, res, next) => {
  try {
    const result = await TripPackage(await makePackageData(req));
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
  // console.log("PACKAGE", req.body);
  try {
    const result = await TripPackage.find({});
    console.log(result.length);

    // completetStatusUpdate(result);
    if (result.length !== 0)
      res
        .status(200)
        .send(Response(result, `All ${req.params.trip} are here...`, true));
    else
      res
        .status(500)
        .send(Response(null, `${req.params.trip} not found!`, false));
  } catch (error) {
    next(error);
  }
};

// getting a particular trip package details
export const getTripDetails = async (req, res, next) => {
  try {
    const result = await TripPackage.find({ _id: req.params.id });
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
        .send(Response(null, `${req.params.trip} not found!`, false));
  } catch (error) {
    next(error);
  }
};

//get filtered trip packages
export const filterTripList = async (req, res, next) => {
  console.log(req.params, "filterR");
  console.log("LOG", req.body);

  try {
    const result = await TripPackage.aggregate([
      {
        $match: {
          $and: [
            {
              $and: [
                {
                  title:
                    req.body.title.length === 0
                      ? { $ne: "" }
                      : { $all: req.body.title },
                },
                {
                  startDate:
                    req.body.checkIn === ""
                      ? { $ne: req.body.checkIn }
                      : { $gte: req.body.checkIn },
                },
                {
                  endDate:
                    req.body.checkOut === ""
                      ? { $ne: req.body.checkOut }
                      : { $lte: req.body.checkOut },
                },
                {
                  maximumGuests:
                    req.body.maximumGuests === ""
                      ? { $ne: "" }
                      : { $gte: Number(req.body.maximumGuests) },
                },
              ],
            },
            {
              $and: [
                {
                  travelType:
                    req.body.travelType.length === 0
                      ? { $ne: "" }
                      : { $in: req.body.travelType },
                },
                {
                  tripCategory:
                    req.body.tripCategory.length === 0
                      ? { $ne: "" }
                      : { $in: req.body.tripCategory },
                },
                {
                  occasions:
                    req.body.occasions.length === 0
                      ? { $ne: "" }
                      : { $in: req.body.occasions },
                },
                {
                  amenities:
                    req.body.amenities.length === 0
                      ? { $ne: "" }
                      : { $in: req.body.amenities },
                },
              ],
            },
            {
              discountedPrice:
                req.body.price === ""
                  ? { $ne: "" }
                  : { $lte: Number(req.body.price) },
            },
            {
              status: { $all: ["Active "] },
            },
          ],
        },
      },
    ]);

    console.log(result, "result");
    res.send(Response(result, 200, `All ${req.params.trip} are here...`, true));
  } catch (error) {
    next(error);
  }
};

//modifying trip packages
export const updatePackage = async (req, res, next) => {
  try {
    const currentData = await TripPackage.findOne({ _id: req.params.id });
    if (currentData === null)
      return res
        .status(200)
        .send(Response(null, `${req.params.trip} not found!`, false));
    const result = await updatePackageData(req);
    const updatedResult = await TripPackage.findOneAndUpdate(
      { _id: req.params.id },
      result,
      { new: true }
    );
    if (updatedResult?._id)
      return res
        .status(200)
        .send(
          Response(updatedResult, `${req.params.trip} data is updated`, true)
        );
  } catch (err) {
    next(err);
  }
};

//deleting trip package
export const deletePackage = async (req, res, next) => {
  try {
    const { trip, id } = req.params;
    const data = await TripPackage.findOne({ _id: id });

    if (data === null)
      return res
        .status(500)
        .send(Response(null, `${req.params.trip} not found!`));

    const tripImage = data.image.split("/")[4];

    deleteFile("packages", tripImage);
    data.tripHighlights.forEach((element) => {
      const icon = element.icon.split("/")[4];
      deleteFile("packages", icon);
    });

    const result = await TripPackage.findOneAndDelete({ _id: id });
    if (result?._id) {
      return res
        .status(200)
        .send(Response(null, `${trip} deleted successfully.`, true));
    }
  } catch (error) {
    next(error);
  }
};
