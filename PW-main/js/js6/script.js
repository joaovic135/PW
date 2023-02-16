
let botao = document.getElementById("pressme");

botao.onclick = function(){
  let grafico1 = document.getElementById("grafico1");
  let altura1 = document.getElementById("altura1").value;
  let largura = document.getElementById("largura1").value;

  grafico1.style.padding = "10px";
  grafico1.style.backgroundColor = "red";
  grafico1.style.height =  altura1+"px";
  grafico1.style.width = largura+"px";
  grafico1.style.margin = "4px"

  let grafico2 = document.getElementById("grafico2");
  let altura2 = document.getElementById("altura2").value;

  grafico2.style.padding = "10px";
  grafico2.style.backgroundColor = "red";
  grafico2.style.height =  altura2+"px";
  grafico2.style.width = largura+"px";
  grafico2.style.margin = "4px"

  let grafico3 = document.getElementById("grafico3");
  let altura3 = document.getElementById("altura3").value;

  grafico3.style.padding = "10px";
  grafico3.style.backgroundColor = "red";
  grafico3.style.height =  altura3+"px";
  grafico3.style.width = largura+"px";
  grafico3.style.margin = "4px"


  let grafico4 = document.getElementById("grafico4");
  let altura4 = document.getElementById("altura4").value;

  grafico4.style.padding = "10px";
  grafico4.style.backgroundColor = "red";
  grafico4.style.height =  altura4+"px";
  grafico4.style.width = largura+"px";
  grafico4.style.margin = "4px"

  let grafico5 = document.getElementById("grafico5");
  let altura5 = document.getElementById("altura5").value;

  grafico5.style.padding = "10px";
  grafico5.style.backgroundColor = "red";
  grafico5.style.height =  altura5+"px";
  grafico5.style.width = largura+"px";
  grafico5.style.margin = "4px"
}