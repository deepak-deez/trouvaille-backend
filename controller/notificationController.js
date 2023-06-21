import server from "../server.js";
import { Server } from "socket.io";
import {
  addNotification,
  getAllNotification,
  getNotificationByUser,
} from "../modules/notificationModule.js";

const notificationController = () => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", async (socket) => {
    socket.on("sendStatusUpdate", async (data) => {
      console.log("Fetched Update : ", data);
      try {
        await addNotification(data);
      } catch (err) {
        console.error(err);
      }
      await getNotificationByUser(data.userId).then((datas) => {
        console.log(data.userId, "id");
        io.emit(data.userId, {
          data: datas,
          status: 200,
          success: true,
        });
      });

      console.log("User ID : ", data.userId);
    });

    socket.emit("getAllNotis", {
      data: await getAllNotification(),
      status: 200,
      success: true,
    });

    socket.emit("hello-joy", {
      here: "is something",
      and: "here is something more",
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
};

export default notificationController;
