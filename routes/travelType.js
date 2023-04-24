import app from "../server.js";
import { travelType } from "../model.js";
import { dataConnection } from "../connection.js";

dataConnection();

//creating Travel type
app.post("/createTravelType", async (req, res) => {
  const data = new travelType(req.body);
  console.log(data);
  try {
    await data.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.messge,
      success: false,
    });
  }
});

//getting Travel Type
app.get("/getTravelType", async (req, res) => {
  const data = await travelType.find({});
  try {
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.messge,
      success: false,
    });
  }
});

//modifying Travel Type
app.put("/modifyTravelType/:id", async (req, res) => {
  try {
    await travelType.findByIdAndUpdate(req.params.id, req.body);
    await travelType.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

//deleting Travel Type
app.delete("/deleteTravelType/:id", async (req, res) => {
  try {
    const data = await travelType.findByIdAndDelete(req.params.id);

    if (!data) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error,
      success: false,
    });
  }
});
