import {Partida} from "../models/index"

const index = async (req,res)=>{
  let partidas = await Partida.findAll();
  partidas = partidas.map((area) => partidas.toJSON());
  res.render("game/index",{
    partidas
  });
}


export default {index}