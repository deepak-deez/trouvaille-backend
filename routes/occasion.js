import app from "../server.js";
import { occasion } from "../model.js";
import { dataConnection } from "../connection.js";

dataConnection();

//creating Occasion
app.post("/createOccasion", async (req, res) => {
  const data = new occasion(req.body);
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

//getting Occasion
app.get("/getOccasion", async (req, res) => {
  const data = await occasion.find({});
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

//modifying Occasion
app.put("/modifyOccasion/:id", async (req, res) => {
  try {
    await occasion.findByIdAndUpdate(req.params.id, req.body);
    await occasion.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

//deleting Occasion
app.delete("/deleteOccasion/:id", async (req, res) => {
  try {
    const data = await occasion.findByIdAndDelete(req.params.id);

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
