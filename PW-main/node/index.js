import { createServer } from "http";
import { upper } from "./utils/strings.js";

const server = createServer(function name(req,res){
  res.write(upper("Instituto de Computacao"));
  res.end();
});

server.listen(3030);