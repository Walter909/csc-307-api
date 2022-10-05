const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

//Get user by name and job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (job != undefined && name != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

//Get user by id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
    res.status(404).send("Resource not found.");
  else {
    result = { users_list: result };
    res.send(result);
  }
});

function findUserById(id) {
  return users["users_list"].find((user) => user["id"] === id); // or line below
}

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

//Add user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = GenerateID();
  addUser(userToAdd);
  //Send user with new Id to client
  //console.log(userToAdd);
  res.send(userToAdd);
  res.status(200).end();
});

function addUser(user) {
  users["users_list"].push(user);
}

//delete user by id
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = deleteUserId(id);
  if (result === undefined || result.length == 0) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).end();
  }
});

function findUserIndexById(id) {
  return users.users_list.findIndex((user) => user["id"] === id);
}

function deleteUserId(id) {
  index = findUserIndexById(id);

  return users["users_list"].splice(index, 1);
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
