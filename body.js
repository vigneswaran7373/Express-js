const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/Student");

const app = express();

app.use(express.json()); // important

mongoose
  .connect("mongodb://127.0.0.1:27017/school")
  .then(() => {
    console.log("connection successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/add", (req, res) => {
  const data = req.body;

  const student = new Student({
    name: data.name,
    rollno: data.rollno,
    branch: data.branch,
    year: data.year,
  });

  student
    .save()
    .then(() => {
      res.send("inserted");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/update", (req, res) => {
  const data = req.body;

  Student.updateOne({ name: "vidhya" }, { name: data.name })
    .then(() => {
      res.send("updated");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/delete", (req, res) => {
  const data = req.body;

  Student.deleteOne({ name: data.name })
    .then(() => {
      res.send("deleted");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
