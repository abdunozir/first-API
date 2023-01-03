const { log } = require("console");
const express = require("express");
let fs = require("fs");
const { ObjectId } = require("mongodb");
const { connectData, getData } = require("./connectDb");
const app = express();

let dataBase;
let PORT = process.env.PORT || 3000;
app.use(express.json());
// server listening...
connectData((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log("listening...");
    });
    dataBase = getData();
  }
});

// all books
app.get("/books", (req, res) => {
  let book = [];
  dataBase
    .collection("Book")
    .find()
    .forEach((el) => {
      book.push(el);
    })
    .then(() => {
      res.status(200).json(book);
    })
    .catch(() => {
      res.status(500).json({ error: "could not get data" });
    });
});

// single book
app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    dataBase
      .collection("Book")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((book) => {
        res.status(200).json(book);
      })
      .catch(() => {
        res.status(500).json({ error: "could fetch the doc!" });
      });
  } else {
    res.status(500).json({ error: "oops, invalid book id :(" });
  }
});

// DELETE request
app.delete("/book/del/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    dataBase
      .collection("Book")
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then(() => {
        res.status(200).json({ delete: "success!" });
      });
  } else {
    res.status(404).json({ error: "some thing went wrong !" });
  }
});

app.post("/books/add", (req, res) => {
  let book = req.body;
  dataBase
    .collection("Book")
    .insertOne(book)
    .then((dt) => {
      res.status(201).json(dt);
    })
    .catch((error) => {
      res.status(500).json({ error: "could not add new book now" });
    });
});

// home page
app.get("/", (req, res) => {
  res.send("welcome to profile called");
});
