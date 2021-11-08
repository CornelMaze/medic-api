const express = require("express");
const cors = require("cors");
const Records = require("./model/record");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// handle CORS error
app.use(cors());
app.use(morgan("tiny"));

// db connection

const mongoose = require("mongoose");
const url = "mongodb://localhost/medicapi";
mongoose.connect(url, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
});
const conn = mongoose.connection;

conn.on("open", () => {
 console.log("Connected to Medic-API database");
});

const PORT = 3002;
app.get("/get-records", async (req, res) => {
 try {
  const record = await Records.find();
  // let result = JSON.stringify(record);
  res.status(200).json({ success: true, data: record });
 } catch (error) {
  res.status(500).json({
   sucess: false,
   error: error.message,
  });
 }
});
app.get("/get-record/:id", async (req, res) => {
 try {
  const record = await Records.findById(req.params.id);
  // let result = JSON.stringify(record);
  res.status(200).json({ success: true, data: record });
 } catch (error) {
  res.status(500).json({
   sucess: false,
   error: error.message,
  });
 }
});
app.post("/create-record", async (req, res) => {
 try {
  let userData = req.body;

  console.log(req.body);
  let diagnosis = userData[0].diagnosis;
  let status = userData[1].status;
  let userName = userData[2].name;
  console.log({ diagnosis, status, userName });
  let record = new Records({ diagnosis, status, userName });
  await record.save((error, newRecord) => {
   if (error) {
    console.log(error);
   } else {
    res.status(200).json({ success: true, data: newRecord });
   }
  });
 } catch (error) {
  res.status(500).json({
   sucess: false,
   error: error.message,
  });
 }
});
// app.use("/api", router);

app.listen(PORT, () => {
 console.log(`server is listening on http://localhost:${PORT}`);
});
