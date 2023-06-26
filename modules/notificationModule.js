import { Notification } from "../models/notificationModel.js";
import { Response } from "./supportModule.js";

export const addNotification = async (req) => {
  try {
    const newNotification = await Notification(req);
    const result = await newNotification.save();
  } catch (err) {
    console.log(err);
  }
};

export const getAllNotification = async (req, res, next) => {
  try {
    return await Notification.find({});
  } catch (err) {
    next(err);
  }
};

export const getNotificationById = async (req, res, next) => {
  try {
    const result = await Notification.findOne({ _id: req.params.id });
    if (result?._id)
      return res
        .status(200)
        .send(Response(result, `notification details are here...`, true));
    return res
      .status(500)
      .send(Response(null, `notification not found!`, false));
  } catch (err) {
    next(err);
  }
};

export const getUserNotification = async (req, res, next) => {
  try {
    const result = await Notification.find({ userId: req.params.id });
    if (result)
      return res
        .status(200)
        .send(Response(result, `notification details are here...`, true));
    return res
      .status(500)
      .send(Response(null, `notification not found!`, false));
  } catch (err) {
    next(err);
  }
};

export const getNotificationByUser = async (userId) => {
  try {
    return await Notification.find({ userId });
  } catch (err) {
    console.error(err);
  }
};

export const allNotification = async (req, res, next) => {
  try {
    const notifications = await Notification.find({});

    return res
      .status(200)
      .send(Response(notifications, `All notifications are here...`, true));
  } catch (err) {
    next(err);
  }
};
