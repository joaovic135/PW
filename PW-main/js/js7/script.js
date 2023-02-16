let pontos = 0

document.addEventListener("mousemove", function(event) {
  let dot = document.createElement("div");
  dot.className = "dot";
  dot.style.left = (event.pageX - 4) + "px";
  dot.style.top = (event.pageY - 4) + "px";
  for(i = 0 ; i<8 ; i++){
    document.body.appendChild(dot);
    
  }
  pontos = pontos+1
  if(pontos > 8){
    document.body.removeChild(dot);
  }
  console.log(pontos)
});