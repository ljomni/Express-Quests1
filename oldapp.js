const express = require("express");
const app = express();
const database = require("./database"); 
const movieControllers = require("./src/controllers/movieControllers");
app.get("/", (req, res) => {
    res.status(200).json("poulet");
  });
app.get("/api/users", (req, res) => {
    const users = database.getUsers();
    res.status(200).json(users);
  });
  

app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = database.getUserById(userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "Utilisateur non trouvé" });
  }
});


app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
module.exports = app;
