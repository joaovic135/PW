import { User } from "../models/index"
import { Curso } from "../models/index"
import bcrypt from "bcryptjs";

const index = (req, res) => {
  const conteudo = "Pagina principal da aplicação"
  res.render('main/index', {
    conteudo,
    layout: 'main'
  })
}

const sobre = (req, res) => {
  const conteudo = "Pagina sobre a aplicação";
  res.render('main/sobre', {
    conteudo,
    layout: 'main'
  })
}

const ui = (req, res) => {
  res.render("main/ui", {
    layout: 'main'
  })
}

const signup = async (req, res) => {

  const cursos = await Curso.findAll();
  if (req.route.methods.get) {
    res.render("cadastro/index", {
      csrf: req.csrfToken(),
      curso: cursos.map(curso => curso.toJSON())
    });
  } else {
    const usuario = req.body;
    try {
      bcrypt.genSalt(10, (errorSalt, salt) => {
        bcrypt.hash(usuario.senha, salt, async (error, hash) => {
          await User.create({
            nome: usuario.nome,
            email: usuario.email,
            senha: hash,
            cursoId: usuario.cursoId
          });
          res.redirect("/");

        })
      })

    } catch (e) {
      console.log(e)
    }
  }
}

export default { index, sobre, ui, signup }
