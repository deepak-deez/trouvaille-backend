import server from "../server.js";
import { Server } from "socket.io";
import {
  addNotification,
  getNotificationByUser,
} from "../modules/notificationModule.js";

const notificationController = () => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", async (socket) => {
    socket.on("sendStatusUpdate", async (data) => {
      try {
        await addNotification(data);
      } catch (err) {
        console.error(err);
      }

      await getNotificationByUser(data.userId).then((datas) => {
        io.emit(data.userId, {
          data: datas,
          status: 200,
          success: true,
        });
      });
    });

    socket.on("sendCurrentBooking", async (data) => {
      try {
        await addNotification(data);
      } catch (error) {
        console.log(error);
      }

      await getNotificationByUser(data.userType).then((datas) => {
        io.emit("getCurrentBooking", {
          data: datas,
          status: 200,
          success: true,
        });
      });
    });

    socket.on("sendCancellationRequest", async (data) => {
      try {
        await addNotification(data);
      } catch (err) {
        console.log(err);
      }

      await getNotificationByUser(data.userType).then((datas) => {
        io.emit("getCancellationRequest", {
          data: datas,
          status: 200,
          success: true,
        });
      });
    });

    socket.on("disconnect", () => {
      console.log(socket.id, " Disconnected");
    });
  });
};

export default notificationController;
