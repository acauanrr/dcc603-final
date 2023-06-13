import express from "express";
import { curso } from "../models/index.js";
import { CursoController } from "../controller/curso.controller.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

const cursoController = new CursoController(curso);

router.get("/", async (req, res) => {
  const cursos = await cursoController.getAll();
  res.json(cursos);
});

router.post(
  "/create",
  [
    //validação dos dados
    body("name").notEmpty().trim().withMessage("O campo nome é obrigatório"),
  ],
  async (req, res) => {
    // caso encontre erros, ficará nessa variável errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //se os dados forem válidos, o sistema executará aqui
    const { name, image, category, description, tags, date_start } = req.body;
    await cursoController.adicionar({
      name,
      image,
      category,
      description,
      tags,
      date_start,
    });
    res.status(201).send("Curso criado com sucesso!");
  }
);

router.get("/pagejson/:id", async (req, res) => {
  const { id } = req.params;
  const curso = await cursoController.getCurso(id);
  res.json(curso);
});

router.get("/page/:id", async (req, res) => {
  const { id } = req.params;
  const curso = await cursoController.getCurso(id);
  const cursoJson = JSON.stringify(curso)

  console.log(cursoJson);
  res.render("pagina-curso.hbs", {cursoJson});
  // res.json(curso);
});

export default router;
