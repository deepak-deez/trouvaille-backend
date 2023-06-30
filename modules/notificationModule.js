import { Notification } from "../models/notificationModel.js";
import { Response } from "./supportModule.js";

// Save notification in DB
export const addNotification = async (req) => {
  try {
    const newNotification = await Notification(req);
    const result = await newNotification.save();
  } catch (err) {
    console.log(err);
  }
};

// Get all notification
export const getAllNotification = async (req, res, next) => {
  try {
    return await Notification.find({});
  } catch (err) {
    next(err);
  }
};

// View a notification
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

// Get all notifications by user
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

// Get cancel booking notifications
export const getBookingAndCancelNotification = async (req, res, next) => {
  try {
    const result = await Notification.find({ userType: req.params.user });
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

// Mark as read notification
export const setMarkAsRead = async (req, res, next) => {
  try {
    const result = await Notification.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { readStatus: true },
      },
      { new: true }
    );
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

// Set mark all read
export const setMarkAllAsRead = async (req, res, next) => {
  try {
    const result = await Notification.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { readStatus: true },
      },
      { new: true }
    );
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

// Get all notifications by userType
export const getNotificationByUser = async (userType) => {
  try {
    if (userType === "Frontend-user" || userType === "Backend-user") {
      return await Notification.find({ userType });
    } else {
      return await Notification.find({ userId: userType });
    }
  } catch (err) {
    console.error(err);
  }
};

// Get all notifications
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
