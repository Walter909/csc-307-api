const express = require("express");
const cors = require("cors");

const userServices = require("./user-service");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

//Get user by name and job
app.get("/users", async (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  try {
    const result = await userServices.getUsers(name, job);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

//Get user by id
app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ users_list: result });
  }
});

//Add user
app.post("/users", async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});

//delete user by id
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = userServices.deleteByID(id);
  if (result === undefined || result.length == 0) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).end();
  }
});

//Id generator
function GenerateID() {
  const first = Math.floor(Math.random() * 10).toString();
  const second = Math.floor(Math.random() * 10).toString();
  const third = Math.floor(Math.random() * 10).toString();
  const letters = ["abc", "def", "ghi", "jkl", "mno", "pqr", "stu", "vwx"];
  const id =
    letters[Math.floor(Math.random() * 10) % letters.length] +
    first +
    second +
    third;
  return id;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
