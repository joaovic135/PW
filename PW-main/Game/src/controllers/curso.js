const models = require("../models")
const Curso = models.Curso;

const index = async (req, res) => { 
  let cursos = await Curso.findAll({
    include:models.Area
  });
  cursos = cursos.map((curso) => curso.toJSON());
  console.log(cursos)
  res.render("curso/index",{
    cursos
  });
}

const create = async (req, res) => {
  if (req.route.methods.get) {
    res.render("curso/create",{
      csrf: req.csrfToken()
    });
  } else {
    const curso = req.body;
    try{
      console.log(req.body)
      await Curso.create(curso);
      res.redirect("/curso")
    }catch(e){
      res.render('curso/create',{
        csrf: req.csrfToken(),
        sigla:req.body.sigla,
        nome: req.body.nome,
        descricao:req.body.descricao,
        areaId: req.body.areaId,
        errors: e
      })
    }
  }
}
const read = async (req, res) => {
  const {id} = req.params;
  let curso = await Curso.findByPk(id,{
    include: models.Area
  });
  curso = curso.toJSON()
  res.render("curso/read",{
    curso
  })
}


const update = async (req, res) => { 
  const {id} = req.params;
  let curso = await Curso.findByPk(id,{
    include: models.Area
  });
  curso = curso.toJSON()

  if(req.route.methods.get){
    res.render("curso/update",{
      curso:curso,
      csrf: req.csrfToken()
    })
  }else{
    try{
      await Curso.update(req.body , {where:{id}});
      console.log(curso)
      console.log("atualizando")
      res.redirect("/curso/"+req.params.id);
    }catch(error){
      console.log("reee")
      res.render("curso/update",{
        curso: curso,
        error:error
      })
    }
  }
}

const remove = async (req, res) => {
  console.log("teste delete")
  const {id} = req.params;
  try{
    await Curso.destroy({where: {id}})
    res.redirect("/curso");
  }catch(e){
    console.log(e)
  }
}

module.exports = { index, create, read, update, remove }