
import { Router } from 'express';
const mainController = require('../controllers/main').default
const areaController = require("../controllers/area.js").default;
const cursoController = require("../controllers/curso");
const router = Router();



//Controlador Main
router.get('/',mainController.index);

router.get('/sobre',mainController.sobre);

router.get('/ui',mainController.ui);


router.get('/',mainController.index);

//Controlador Curso

router.get("/curso", cursoController.index);
router.get("/curso/create", cursoController.create);
router.post("/curso/create", cursoController.create);
router.get("/curso/:id", cursoController.read);
router.get("/curso/update/:id", cursoController.update);
router.post("/curso/update/:id", cursoController.update);
router.get("/curso/remove/:id", cursoController.remove);



//Controlador Area
router.get("/areas",areaController.index)

module.exports = router;
