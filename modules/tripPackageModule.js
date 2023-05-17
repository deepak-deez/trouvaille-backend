import { tripPackage } from "../models/tripPackageModel.js";
import { readFileSync } from "fs";
import { Response, tripPackageObject } from "./supportModule.js";
import { nextTick } from "process";
import cloudinary from "./cloudinary.js";

//creating trip packages

export const createTripPackage = async (req, res, next) => {
  try {
    const { tripHighlights } = req.body;
    const profileimage = await cloudinary.uploader.upload(req.body.image, {
      folder: `${req.params.trip}`,
    });

    const result = await tripPackage.create(
      tripPackageObject(profileimage, req.body)
    );
    const data = tripHighlights.map(async (element) => {
      const iconImage = await cloudinary.uploader.upload(element.icon, {
        folder: `${req.params.trip}`,
      });
      element.icon = {
        public_id: iconImage.public_id,
        url: iconImage.secure_url,
      };
      return element;
    });

    Promise.all(data).then(async (results) => {
      result.tripHighlights = results;
      const saveData = await result.save();
      if (saveData?._id)
        return res.send(
          Response(result, 200, `New ${req.params.trip} added.`, true)
        );
      return res.send(
        Response(null, 500, `${req.params.trip} not added!`, false)
      );
    });
  } catch (error) {
    next(error);
  }
};

//getting trip packages
export const getTripPackages = async (req, res) => {
  try {
    const result = await tripPackage.find({});
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
export const getTripDetails = async (req, res) => {
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
    await cloudinary.uploader.destroy(currentData.image.public_id);
    const profileimage = await cloudinary.uploader.upload(req.body.image, {
      folder: `${req.params.trip}`,
    });

    const data = req.body;
    data.image = {
      public_id: profileimage.public_id,
      url: profileimage.secure_url,
    };

    let highlights = currentData.tripHighlights.length;

    for (let i = 0; i < highlights; i++) {
      await cloudinary.uploader.destroy(
        currentData.tripHighlights[i].icon.public_id
      );

      const iconImage = await cloudinary.uploader.upload(
        req.body.tripHighlights[i].icon,
        {
          folder: `${req.params.trip}`,
        }
      );
      data.tripHighlights[i].icon = {
        public_id: iconImage.public_id,
        url: iconImage.secure_url,
      };
    }

    const updatedResult = await tripPackage.findByIdAndUpdate(
      req.params.id,
      {
        $set: data,
      },
      { new: true }
    );
    res.send(
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

    let imgId = data.image.public_id;
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }

    data.tripHighlights.map(async (element) => {
      await cloudinary.uploader.destroy(element.icon.public_id);
    });

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
