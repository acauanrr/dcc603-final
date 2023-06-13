import express from "express";
import users from "./users.js";
import cursos from "./cursos.js";

import { curso } from "../models/index.js";
import { CursoController } from "../controller/curso.controller.js";

const router = express.Router();

const cursoController = new CursoController(curso);

// router.get("/", (req, res) => {
//   // res.send("Pagina inicial");
//   res.sendFile(__basedir + "/frontend/src/index.html");
// });

router.get("/", async (req, res) => {

  const cursos = await cursoController.getAll();


  res.render("home.hbs", {cursos});
});

router.use("/users", users);
router.use("/cursos", cursos);

export default router;
