import server from "../server.js";
import { Server } from "socket.io";

const notificationController = () => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("Connection Established!", socket.id);
    const response = "response you need";

    // socket.emit("hello-bye", response);

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    // socket.on("hello", (data) => {
    //   console.log("Hello on : ", data);
    // });

    // socket.on("getId", (data) => {
    //   socket.emit("response", `I'am a response with your id ${data}`);
    //   console.log("User ID : ", data);
    // });

    socket.on("sendNotis", (data) => {
      socket.broadcast.emit("getNotis", `I have the notification : ${data}`);
      console.log("Admin's Notis : ", data);
    });
  });
};

export default notificationController;
