import { Notification } from "../models/notificationModel.js";
import { Response } from "./supportModule.js";

export const addNotification = async (req, res, next) => {
  try {
    const newNotification = await Notification(req.body);
    const result = await newNotification.save();
    if (result?._id)
      res
        .status(200)
        .send(Response(newNotification, "New notification added!", true));
    else
      res
        .status(500)
        .send(Response(null, "Failed to add notification!", false));
  } catch (err) {
    next(err);
  }
};

export const getAllNotification = async (req, res, next) => {
  try {
    const notifications = await Notification.find({});
    return res
      .status(200)
      .send(Response(notifications, `All notifications are here...`, true));
  } catch (err) {
    next(err);
  }
};

export const getNotificationById = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({ _id: req.params.id });
    if (notification?._id)
      return res
        .status(200)
        .send(Response(notification, `notification details are here...`, true));
    return res
      .status(500)
      .send(Response(null, `notification not found!`, false));
  } catch (err) {
    next(err);
  }
};
