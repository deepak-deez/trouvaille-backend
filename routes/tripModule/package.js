import { tripPackage } from "../../schema/tripPackageModel.js";

//creating trip packages
export const createTripPackage = async (req, res) => {
  try {
    const packages = await tripPackage({
      purpose: "Package",
      title: req.body.title,
      image: req.body.image,
      duration: req.body.duration,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      category: req.body.category,
      placeNumber: req.body.placeNumber,
      maximumGuests: req.body.maximumGuests,
      tripHighlights: {
        title: req.body.tripHighlights.title,
        name: req.body.tripHighlights.name,
        description: req.body.tripHighlights.description,
        icon: req.body.tripHighlights.icon,
      },
      price: req.body.price,
      discountedPrice: req.body.discountedPrice,
      occasions: req.body.occasions,
      travelType: req.body.travelType,
      amenities: req.body.amenities,
      briefDescription: req.body.briefDescription,
      faq: {
        // question: req.body.faq.question,
        // answer: req.body.faq.answer,
      },
      status: req.body.status,
    });
    const result = await packages.save();
    res.send({
      data: null,
      message: "New Package added",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

//getting trip packages
export const getTripPackage = async (req, res) => {
  const data = await tripPackage.find({
    purpose: "Package"
  });
  try {
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.messge,
      success: false,
    });
  }
};

//modifying trip packages
export const updatePackage = async (req, res) => {
  try {
    const modifiedTripPackage = await tripPackage.findByIdAndUpdate(req.params.id, req.body);
    const modifiedPackage = await modifiedTripPackage.save();
    res.send({
      data: null,
      message: 'Package updated',
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

//deleting trip package
export const deletePackage = async (req, res) => {
  try {
    const toBeDeletedPackage = await tripPackage.findByIdAndDelete(req.params.id);

    if (!toBeDeletedPackage) res.status(404).send("No item found");
    res.status(200).send({
      data: null,
      message: 'package deleted',
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
