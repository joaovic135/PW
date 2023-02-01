
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

const ui = (req,res)=>{
  res.render("main/ui",{
    layout: 'main'
  })
}



export default { index, sobre ,ui}
