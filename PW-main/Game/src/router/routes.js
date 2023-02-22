
import { Router } from 'express';
const mainController = require('../controllers/main').default
const areaController = require("../controllers/area.js").default;
const cursoController = require("../controllers/curso");
const partidaController = require("../controllers/partida").default;
const router = Router();



//Controlador Main
router.get('/',mainController.index);

router.get('/sobre',mainController.sobre);

router.get('/ui',mainController.ui);


router.get('/',mainController.index);

//Cadastro de Usuario
router.get("/cadastro", mainController.signup)
router.post("/cadastro", mainController.signup)

//Controlador Curso

router.get("/curso", cursoController.index);
router.get("/curso/create", cursoController.create);
router.post("/curso/create", cursoController.create);
router.get("/curso/:id", cursoController.read);
router.get("/curso/update/:id", cursoController.update);
router.post("/curso/update/:id", cursoController.update);
router.get("/curso/remove/:id", cursoController.remove);

//Jogo
router.get("/game", partidaController.index);

//Controlador Area
router.get("/areas",areaController.index)

module.exports = router;
