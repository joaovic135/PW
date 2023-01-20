
let botao = document.getElementById("pressme")

botao.onclick = function(e){
  let raio = document.getElementById("raio").value
  let c = 2 * 3.14  * raio
  let a = 3.14 * raio * raio
  document.getElementById("area").value = a
  document.getElementById("circu").value = c 
   
}