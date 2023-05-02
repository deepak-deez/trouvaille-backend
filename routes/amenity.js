import { tripDetails } from "../schema/FeatureModel.js";
import multer from "multer";
import { Response } from "../modules/supportModule.js";
import fs from "fs";

// export const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// export const amenityIcon = multer({ storage: storage });

// //creating Amenity
// export const createAmenity = async (req, res, next) => {
//   let imageString = fs.readFileSync("images/" + req.file.originalname);
//   let encodeImage = imageString.toString("base64");
//   let bufferImage = Buffer.from(encodeImage, "base64");
//   try {
//     const amenity = await tripDetails({
//       purpose: "Amenity",
//       icon: {
//         data: bufferImage,
//         contentType: "image/png+jpg+jpeg",
//       },
//       title: req.body.title,
//       description: req.body.description,
//     });
//     const amenityResult = await amenity.save();
//     res.send(Response(amenityResult, 200, "New amenity added.", true));
//   } catch (error) {
//     next(error);
//   }
// };

// //getting Amenity
// export const getAmenity = async (req, res, next) => {
//   try {
//     const data = await tripDetails.find({ purpose: req.params.trip });
//     if (data.length !== 0)
//       res.send(Response(data, 200, "All amemities are here...", true));
//     else res.send(Response(null, 500, "Amenity not found!", true));
//   } catch (error) {
//     next(error);
//   }
// };

//modifying Amenity
// export const modifyAmenity = async (req, res) => {
//   try {
//     const modifiedAmenity = await tripDetails.findByIdAndUpdate(
//       req.params.id,
//       req.body
//     );
//     const modifiedResult = await modifiedAmenity.save();
//     console.log(modifiedResult);
//     res.send({
//       data: {
//         purpose: "Amenity",
//         icon: req.body.icon,
//         title: req.body.title,
//         description: req.body.description,
//       },
//       message: "amenity modified",
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).send({
//       data: null,
//       message: error.message,
//       success: false,
//     });
//   }
// };

//deleting Amenity
export const deleteAmenity = async (req, res) => {
  try {
    const toBeDeletedAmenity = await tripDetails.findByIdAndDelete(
      req.params.id
    );

    if (!toBeDeletedAmenity) res.status(404).send("No item found");
    res.status(200).send({
      data: toBeDeletedAmenity,
      message: "amenity deleted",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error,
      success: false,
    });
  }
};
