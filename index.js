const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/Student");

const app = express();

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
  const student = new Student({
    name: "vicky",
    rollno: 1,
    branch: "Cse",
    year: 2020,
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
app.put("/update",(req,res)=>{
  Student.updateOne({name:"vicky"},
    {name:"vignes"}).then(()=>{
      res.send("update")
    })
})
app.delete("/delete",(req,res)=>{
  Student.deleteOne({name:"vignes"}).then(()=>{
    res.send("deleted")
  })
})

app.listen(3000, () => {
  console.log("server running on port 3000");
});
