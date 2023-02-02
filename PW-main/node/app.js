import express from "express";
const router = require("./src/router/routes");
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
const csurf = require('csurf');
const sass = require('node-sass-middleware');
const app = express();
const PORT = 3000;


app.engine("handlebars",handlebars.engine({
  layoutsDir: `${__dirname}/src/views/layout`,
  helpers: require(`${__dirname}/src/views/helpers/helper.js`),
  defaultLayout: 'main'
}));


app.set("view engine","handlebars");
app.set("views", `${__dirname}/src/views`);

app.use(sass({
  src: `${__dirname}/public/scss`,
  dest: `${__dirname}/public/css`,
  outputStyle: "compressed",
  prefix: "/css",
}));



app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/img", express.static(`${__dirname}/public/img`));

app.use("/webfonts", express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`));
app.use("/js",[
  express.static(`${__dirname}/public/js`),
  express.static(`${__dirname}/node_modules/bootstrap/dist/js/`),
  express.static(`${__dirname}/node_modules/@popperjs/core/dist/umd/`)
]);

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(csurf({ cookie: true }));


app.get("/teste-cookie",(req,res)=>{
  if(!('nome' in req.cookies)){
    res.cookie('nome','value');
    res.send("Voce Nunca passou por aqui.")
  }else{
    res.send("Voce ja passou por aqui")
  }
})
app.use(router);
 
app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
  