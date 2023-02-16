import {Area} from "../models/index"

const index = async (req,res)=>{
  let areas = await Area.findAll();
  areas = areas.map((area) => area.toJSON());
  res.render("area/index",{
    areas
  });
}


export default {index}