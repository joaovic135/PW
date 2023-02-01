const models = require("../models")
const Curso = models.Curso;

const index = async (req, res) => { 
  let cursos = await Curso.findAll();
  cursos = cursos.map((curso) => curso.toJSON());

  res.render("curso/index",{
    cursos
  });
}

const create = async (req, res) => {
  if (req.route.methods.get) {
    res.render("curso/create");
  } else {
    const curso = req.body;
    try{
      await Curso.create(curso);
      res.redirect("/curso")
    }catch(e){
      res.render('curso/create',{
        curso:req.body,
        errors: e
      })
    }
  }
}
const read = async (req, res) => {
  const {id} = req.params;
  console.log(id)
  let curso = await Curso.findByPk(id);
  curso = curso.toJSON()
  console.log(curso)
  res.render("curso/read",{
    curso
  })
}


const update = async (req, res) => { 
  let curso = await Curso.findOne({where:{id:req.params.id}});
  curso = curso.toJSON()
  if(req.route.methods.get){
    res.render("curso/update",{
      curso:curso
    })
  }else{
    try{
      await Curso.update(curso , {where:{id:req.params.id}});
      res.redirect("/curso/"+req.params.id);
    }catch(error){
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