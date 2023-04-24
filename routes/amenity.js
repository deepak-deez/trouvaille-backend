import app from "../server.js";
import { amenity } from "../model.js";
import { dataConnection } from "../connection.js";

dataConnection();

//creating amenity
app.post("/createAmenity", async (req, res) => {
  const data = new amenity(req.body);
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

//getting Amenity
app.get("/getAmenity", async (req, res) => {
  const data = await amenity.find({});
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

//modifying Amenity
app.put("/modifyAmenity/:id", async (req, res) => {
  try {
    await amenity.findByIdAndUpdate(req.params.id, req.body);
    await amenity.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
});

//deleting ameni†y
app.delete("/deleteAmenity/:id", async (req, res) => {
  try {
    const data = await amenity.findByIdAndDelete(req.params.id);

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
