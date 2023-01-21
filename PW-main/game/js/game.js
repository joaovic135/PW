(function () {

  const TAMX = 600;
  const TAMY = 800;
  const FPS = 200;

  var speed = 1
  var x =0
  var j = 0
  var i = 0
  var m = 0;
  var od = 0
  var Pause = true;
  var Morreu = false;
  var Lposi = 450;
  var VidasLeft = 3;
  var Pontuacao = 0;
  var z = 0;
  var y = 0;
  var k = 0;

  const PROB_ENEMY_SHIP = 0.5
  const PROB_ASTEROID_BIG = 0.5
  const PROB_ASTEROID_SMALL = 0.5
  const PROB_DISCO_VOADOR = 0.5


  let space, ship , ponto;

  let discoVoador = [];
  let asteroidSmall = [];
  let asteroidBig = [];
  let enemies = [];
  let tiros = [];


  let vidas = [3];

  let destruido = [];

  function init() {

    space = new Space();
    ship = new Ship();

    for (j = 0; j < 3; j++) {
      vidas[j+1] = new Life(j,Lposi)
      console.log(vidas[j+1].element)
      Lposi -= 50;
    }
    j=0
    Lposi = 450;

    ponto = new Pontos();

    if(Morreu == true){
      Morreu = false
      clearInterval(interval)
      
      const interval = window.setInterval(run, 1000/FPS);
      
    }
    const interval = window.setInterval(run, 1000/FPS);

  }

  

  // Pausar e continuar o jogo
  window.addEventListener("keydown", (e) => {
    if (e.code === "KeyP") {
      if (Pause == false) {
        Pause = true
      } else {
        Pause = false
      }
    }

    if (e.code == "Space") {
      Pause = false
    }
  })


  // Movimentação da nave
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft"){ 
      ship.mudaDirecao(-1);
    
    }else if (e.key === "ArrowRight") ship.mudaDirecao(+1);
  })

  //tiro da nave
  window.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
     
      tiros.push(new Shot(od));
      od++;

    }

  })

  //Background do espaço
  class Space {
    constructor() {
      this.element = document.getElementById("space");
      this.element.style.width = `${TAMX}px`;
      this.element.style.height = `${TAMY}px`;
      this.element.style.backgroundPositionY = "0px"
    }

    move() {
      this.element.style.backgroundPositionY = `${parseInt(this.element.style.backgroundPositionY) + 1
        }px`
    }
  }

  class Pontos{
    constructor(){
      this.element = document.createElement("p");
      this.element.innerHTML = String(Pontuacao).padStart(6, '0');
      this.element.className = "pontos";
      this.element.style.top = "0px";
      this.element.style.left = "490px";
      space.element.appendChild(this.element);
    }
  }

  class TextoMorte{
    constructor(){
      this.element = document.createElement("p");
      this.element.innerHTML = "Game Over";
      this.element.className = "textoMorte";
      this.element.style.left = `214px`
      this.element.style.top = `${parseInt(TAMY / 2) -50}px`
      space.element.appendChild(this.element)
    }
  }
  //Nave do jogador
  class Ship {
    constructor() {
      this.element = document.getElementById("ship");
      this.AssetsDirecoes = [
        "assets/playerLeft.png",
        "assets/player.png",
        "assets/playerRight.png",
      ];
      this.direcao = 1;
      this.element.src = this.AssetsDirecoes[this.direcao];
      this.element.style.top = "700px"
      this.element.style.left = `${parseInt(TAMX / 2) - 50}px`
    }

    mudaDirecao(giro) {
      if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
        this.direcao += giro;
        this.element.src = this.AssetsDirecoes[this.direcao];
      }
    }

    move() {
      if (this.direcao === 0)
        if (parseInt(this.element.style.left) > 0)
          this.element.style.left = `${parseInt(this.element.style.left) - 1}px`
      if (this.direcao === 2)
        if (parseInt(this.element.style.left) < TAMX - 100)
          this.element.style.left = `${parseInt(this.element.style.left) + 1}px`

      space.move();

    }
  }

  //Vida do jogador
  class Life {
    constructor(id,Lposi) {
      this.element = document.createElement("img");
      this.element.id = id
      this.element.className = "life";
      this.element.src = "assets/life.png";
      this.element.style.top = "0px";
      this.element.style.left = `${parseInt(Lposi)}px`
      space.element.appendChild(this.element);
    }
  }

  //Tiro do jogador
  class Shot {
    constructor(id) {
      this.element = document.createElement("img");
      this.element.id = id
      this.element.className = "shot";
      this.element.src = "assets/laserRed.png";
      this.element.style.top = `${parseInt(ship.element.style.top) - 37}px`
      this.element.style.left = `${parseInt(ship.element.style.left) + 45}px`
      space.element.appendChild(this.element);
    }

    move() {
      this.element.style.top = `${parseInt(this.element.style.top) - 2}px`
    }
  }

  //Nave inimiga
  class EnemyShip {
    constructor(id) {
      this.element = document.createElement("img");
      this.element.id = id
      this.element.className = "enemy-ship";
      this.element.src = "assets/enemyShip.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);

    }
    move(speed) {
      this.element.style.top = `${parseInt(this.element.style.top) + 1+speed}px`;
    }
  }

  //Disco voador
  class UFO{
    constructor(id) {
      this.element = document.createElement("img");
      this.element.id = id
      this.element.className = "ufo";
      this.element.src = "assets/enemyUFO.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);

    }
    move(speed) {
      this.element.style.top = `${parseInt(this.element.style.top) + 1+speed}px`;
    }
  }

  //Asteroid grande
  class AsteroidG {
    constructor(id) {
      this.element = document.createElement("img");
      this.element.id = id
      this.element.className = "asteroid-G";
      this.element.src = "assets/meteorBig.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);

    }
    move(speed) {
      this.element.style.top = `${parseInt(this.element.style.top) + 1+speed}px`;
    }
  }
  
  //Asteroid pequeno
  class AsteroidP {
    constructor(id) {
      this.element = document.createElement("img");
      this.element.id = id
      this.element.className = "asteroid-P";
      this.element.src = "assets/meteorSmall.png";
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);

    }
    move(speed) {
      this.element.style.top = `${parseInt(this.element.style.top) + 1+speed}px`;
    }
  }

  //Imagem de nave inimiga destruida
  class Destruido{
    constructor(id , a , e){
      this.element = document.createElement("img");
      this.element.id = id;
      this.element.className = "destroy";
      this.element.src = "assets/laserRedShot.png";

      this.element.style.top= e[a].element.style.top;

      if(e[a].element.className == "asteroid-G"){
        this.element.style.left= `${parseInt(e[a].element.style.left) + 50}px`
      }else{
        this.element.style.left= e[a].element.style.left;
      }
      space.element.appendChild(this.element);
    }
  }

  class Botao{
    constructor(){
      this.element = document.createElement("button");
      this.element.id = "press me"
      this.element.innerText = "TEEEEESSSSTTTEEEE";
      this.element.className = "botao"
      this.element.style.top = `${parseInt(TAMY / 2) +50 }px`
      this.element.style.left = "226px"
      space.element.appendChild(this.element);

    }
  }


  function run() {
    if (Pause == false) {


      //Movimento do jogador
      ship.move();

      //Tiro do jogador
      tiros.forEach((e) => e.move());

      //Tiro saiu da tela 
      for (let i = tiros.length - 1; i >= 0; i--) {
        if (tiros[i] != undefined) {
          if (space.element.contains(tiros[i].element)) {
            if (parseInt(tiros[i].element.style.top) == -31) {
              space.element.removeChild(tiros[i].element)
            }
          }
        }
      }

      // --------- NAVES INIMIGAS --------- 

      //Surgimento de naves inimigas 
      const random_enemy_shyp = Math.random() * 100;
      if (random_enemy_shyp <= PROB_ENEMY_SHIP) {
        enemies.push(new EnemyShip(i));
        i++
      }

      //Movimento da nave inimiga 
      enemies.forEach((e) => e.move(speed));

      // Removendo naves inimigas fora da tela
      for (let i = enemies.length - 1; i >= 0; i--) {
        if (enemies[i] != undefined) {
          if (parseInt(enemies[i].element.style.top) >= TAMY) {
            if (space.element.contains(enemies[i].element)) {
              space.element.removeChild(enemies[i].element)
            }
            //
          }
        }
      }

      // Nave inimiga encostou no jogador
      for(let e = enemies.length - 1 ; e >=0 ; e--){
        if (parseInt(enemies[e].element.style.left) + 98 > parseInt(ship.element.style.left)) {
          if (parseInt(enemies[e].element.style.left) < (parseInt(ship.element.style.left) + 98)) {
            if (parseInt(enemies[e].element.style.top) == parseInt(ship.element.style.top)) {
              if(space.element.contains(enemies[e].element)){
                
                if(space.element.contains(vidas[VidasLeft].element)){
                  console.log(VidasLeft)
                  console.log(vidas[VidasLeft].element)
                  space.element.removeChild(vidas[VidasLeft].element)
                  
                }
                
                VidasLeft -= 1
                console.log("atingiu")
                ship.element.src = "assets/playerDamaged.png";
                console.log(enemies[e])
                destruido.push(new Destruido(x,e,enemies));

                space.element.removeChild(enemies[e].element)
               
               
                //Imagem de nave destruida
                if (destruido[x] != undefined) {
                  if(space.element.contains(destruido[x].element)){
                    (function(x) {
                      setTimeout(function() {      
                        if (destruido[x] != undefined)  
                          if(space.element.contains(destruido[x].element))     
                            space.element.removeChild(destruido[x].element)
                      }, 200);
                  })(x);
                  }
                }
                
                // mudar a imagem para danificada e chamar set timeout com 5 segundos para mudar a imagem de volta para a normal 
                (function(ship) {
                  setTimeout(function() {      
                    ship.element.src = "assets/player.png"
                  }, 5000);
                })(ship);
              

                if (VidasLeft == 0) {
                  Morreu = true
                  m = 0 
                  console.log("Morreu")
                }

                x+=1
              }
            }
          }
        }
      }

      //Tiro encostou em nave inimiga 
      for (let i = tiros.length - 1; i >= 0; i--) {
        for (let o = enemies.length - 1; o >= 0; o--) {
          if (enemies[o] != undefined) {

            if (parseInt(tiros[i].element.style.left) > (parseInt(enemies[o].element.style.left))) {
              if (parseInt(tiros[i].element.style.left) < (parseInt(enemies[o].element.style.left) + 92)) {

                if (parseInt(tiros[i].element.style.top) <= parseInt(enemies[o].element.style.top) + 45 && parseInt(tiros[i].element.style.top) >= parseInt(enemies[o].element.style.top) ){
                  if (space.element.contains(tiros[i].element)) {
                    if (space.element.contains(enemies[o].element)) {

                      destruido.push(new Destruido(x,o,enemies));
                      
                      space.element.removeChild(tiros[i].element)
                      space.element.removeChild(enemies[o].element)
                      
                      if (destruido[x] != undefined) {
                        console.log("teste")
                        if(space.element.contains(destruido[x].element)){
                          Pontuacao = parseInt(Pontuacao) + 50
                          ponto.element.innerHTML =  String(Pontuacao).padStart(6, '0');
                    
                          (function(x) {
                              setTimeout(function() {      
                                if (destruido[x] != undefined)  
                                  if(space.element.contains(destruido[x].element))     
                                    space.element.removeChild(destruido[x].element)
                              }, 200);
                          })(x);
                        }
                      }
                      x++;
                      
                    }
                  }
                }
              }
            }
          }
        }
      }

      // --------- ASTEROIDE GRANDE ---------

      //Surgimento de asteroides grandes
      const random_asteroidG = Math.random() * 100;
      if (random_asteroidG <= PROB_ASTEROID_BIG) {
        asteroidBig.push(new AsteroidG(z));
        z++
      }

      //Movimento de asteroides grandes
      asteroidBig.forEach((e) => e.move(speed));

      // Removendo asteroides grandes fora da tela
      for( let i = asteroidBig.length - 1; i >= 0 ; i--){
        if(asteroidBig[i] != undefined){
          if(parseInt(asteroidBig[i].element.style.top) >= TAMY){
            if(space.element.contains(asteroidBig[i].element)){
              space.element.removeChild(asteroidBig[i].element)
            }
          }
        }
      }

      //Tiro encostou em asteroid grande
      for( let i = tiros.length - 1; i >= 0 ; i--){
        for(let o = asteroidBig.length -1 ; o >= 0 ; o--){
          if(asteroidBig[o]!= undefined){
            if (parseInt(tiros[i].element.style.left) > (parseInt(asteroidBig[o].element.style.left))){
              if (parseInt(tiros[i].element.style.left) < (parseInt(asteroidBig[o].element.style.left) + 136)){
                if (parseInt(tiros[i].element.style.top) <= parseInt(asteroidBig[o].element.style.top) + 100 && parseInt(tiros[i].element.style.top) >= parseInt(asteroidBig[o].element.style.top) ){
                  if(space.element.contains(tiros[i].element)){
                    if(space.element.contains(asteroidBig[o].element)){

                      destruido.push(new Destruido(x,o,asteroidBig));

                      space.element.removeChild(tiros[i].element)
                      space.element.removeChild(asteroidBig[o].element)

                      if (destruido[x] != undefined){
                        if(space.element.contains(destruido[x].element)){
                          Pontuacao = parseInt(Pontuacao) + 10
                          ponto.element.innerHTML =  String(Pontuacao).padStart(6, '0');
                          (function(x) {
                            setTimeout(function() {      
                              if (destruido[x] != undefined)  
                                if(space.element.contains(destruido[x].element))     
                                  space.element.removeChild(destruido[x].element)
                            }, 200);
                          })(x);
                        }
                      }
                      x++;
                    }
                  }
                }
              }
            }
          }
        }
      }

      //Asteroid grande atingiu nave do jogador
      for(let e = asteroidBig.length - 1 ; e >=0 ; e--){
        if (parseInt(asteroidBig[e].element.style.left) + 136 > parseInt(ship.element.style.left)) {
          if (parseInt(asteroidBig[e].element.style.left) < (parseInt(ship.element.style.left) + 98)) {
            if (parseInt(asteroidBig[e].element.style.top) == parseInt(ship.element.style.top)) {
              if(space.element.contains(asteroidBig[e].element)){
                if(space.element.contains(vidas[VidasLeft].element)){
                  console.log(VidasLeft)
                  space.element.removeChild(vidas[VidasLeft].element)
                }
                
                VidasLeft -= 1
                console.log("atingiu")
                ship.element.src = "assets/playerDamaged.png";
                console.log(asteroidBig[e])
                destruido.push(new Destruido(x,e,asteroidBig));
      
                space.element.removeChild(asteroidBig[e].element)
                
                
                //Imagem de nave destruida
                if (destruido[x] != undefined) {
                  if(space.element.contains(destruido[x].element)){
                    (function(x) {
                      setTimeout(function() {      
                        if (destruido[x] != undefined)  
                          if(space.element.contains(destruido[x].element))     
                            space.element.removeChild(destruido[x].element)
                      }, 200);
                  })(x);
                  }
                }
                
                // mudar a imagem para danificada e chamar set timeout com 5 segundos para mudar a imagem de volta para a normal 
                (function(ship) {
                  setTimeout(function() {      
                    ship.element.src = "assets/player.png"
                  }, 5000);
                })(ship);
              
      
                if (VidasLeft == 0) {
                  Morreu = true
                  m = 0
                  console.log("Morreu")
                }
      
                x+=1
              }
            }
          }
        }
      }      

      // --------- ASTEROID PEQUENO ---------

      //surgimento de asteroid pequeno
      const random_asteroidP = Math.random()  * 100;
      if (random_asteroidP <= PROB_ASTEROID_SMALL) {
        asteroidSmall.push(new AsteroidP(y));
        y++
      }

      //Movimento de asteroid pequeno
      asteroidSmall.forEach((e) => e.move(speed));

      //Removendo asteroid pequenos fora da tela 
      for( let i = asteroidSmall.length - 1; i >= 0 ; i--){
        if(asteroidSmall[i] != undefined){
          if(parseInt(asteroidSmall[i].element.style.top) >= TAMY){
            if(space.element.contains(asteroidSmall[i].element)){
              space.element.removeChild(asteroidSmall[i].element)
            }
          }
        }
      }

      //Tiro encostrou em asteroid pequeno
      for( let i = tiros.length - 1; i >= 0 ; i--){
        for(let o = asteroidSmall.length -1 ; o >= 0 ; o--){
          if(asteroidSmall[o]!= undefined){
            if (parseInt(tiros[i].element.style.left) > (parseInt(asteroidSmall[o].element.style.left))){
              if (parseInt(tiros[i].element.style.left) < (parseInt(asteroidSmall[o].element.style.left) + 44)){
                if (parseInt(tiros[i].element.style.top) <= parseInt(asteroidSmall[o].element.style.top) + 39 && parseInt(tiros[i].element.style.top) >= parseInt(asteroidSmall[o].element.style.top) ){
                  if(space.element.contains(tiros[i].element)){
                    if(space.element.contains(asteroidSmall[o].element)){
      
                      destruido.push(new Destruido(x,o,asteroidSmall));
      
                      space.element.removeChild(tiros[i].element)
                      space.element.removeChild(asteroidSmall[o].element)
      
                      if (destruido[x] != undefined){
                        if(space.element.contains(destruido[x].element)){
                          Pontuacao = parseInt(Pontuacao) + 100
                          ponto.element.innerHTML =  String(Pontuacao).padStart(6, '0');
                          (function(x) {
                            setTimeout(function() {      
                              if (destruido[x] != undefined)  
                                if(space.element.contains(destruido[x].element))     
                                  space.element.removeChild(destruido[x].element)
                            }, 200);
                          })(x);
                        }
                      }
                      x++;
                    }
                  }
                }
              }
            }
          }
        }
      }

      //Asteroid pequeno atingiu nave do jogador
      for(let e = asteroidSmall.length - 1 ; e >=0 ; e--){
        if (parseInt(asteroidSmall[e].element.style.left) + 44 > parseInt(ship.element.style.left)) {
          if (parseInt(asteroidSmall[e].element.style.left) < (parseInt(ship.element.style.left) + 98)) {
            if (parseInt(asteroidSmall[e].element.style.top) == parseInt(ship.element.style.top)) {
              if(space.element.contains(asteroidSmall[e].element)){
                
                space.element.removeChild(vidas[VidasLeft].element)
                VidasLeft -= 1
                console.log("atingiu")
                ship.element.src = "assets/playerDamaged.png";
                console.log(asteroidSmall[e])
                destruido.push(new Destruido(x,e,asteroidSmall));
      
                space.element.removeChild(asteroidSmall[e].element)
                
                
                //Imagem de nave destruida
                if (destruido[x] != undefined) {
                  if(space.element.contains(destruido[x].element)){
                    (function(x) {
                      setTimeout(function() {      
                        if (destruido[x] != undefined)  
                          if(space.element.contains(destruido[x].element))     
                            space.element.removeChild(destruido[x].element)
                      }, 200);
                  })(x);
                  }
                }
                
                // mudar a imagem para danificada e chamar set timeout com 5 segundos para mudar a imagem de volta para a normal 
                (function(ship) {
                  setTimeout(function() {      
                    ship.element.src = "assets/player.png"
                  }, 5000);
                })(ship);
              
      
                if (VidasLeft == 0) {
                  Morreu = true
                  m = 0
                  console.log("Morreu")
                }
      
                x+=1
              }
            }
          }
        }
      } 

       // --------- DISCO VOADOR ---------
      
       //Surgimento de Disco voador 
      const random_discoV = Math.random() *100;
      if (random_discoV <= PROB_DISCO_VOADOR) {
        discoVoador.push(new UFO(k));
        k++
      }

      //Movimento de Disco voador
      discoVoador.forEach((e) => e.move(speed));

      //Removendo disco voador fora da tela 
      for( let i = discoVoador.length - 1; i >= 0 ; i--){
        if(discoVoador[i] != undefined){
          if(parseInt(discoVoador[i].element.style.top) >= TAMY){
            if(space.element.contains(discoVoador[i].element)){
              space.element.removeChild(discoVoador[i].element)
            }
          }
        }
      }
      
      //Tiro encostou em disco voador
      for( let i = tiros.length - 1; i >= 0 ; i--){
        for(let o = discoVoador.length -1 ; o >= 0 ; o--){
          if(discoVoador[o]!= undefined){
            if (parseInt(tiros[i].element.style.left) > (parseInt(discoVoador[o].element.style.left))){
              if (parseInt(tiros[i].element.style.left) < (parseInt(discoVoador[o].element.style.left) + 91)){
                if (parseInt(tiros[i].element.style.top) <= parseInt(discoVoador[o].element.style.top) + 39 && parseInt(tiros[i].element.style.top) >= parseInt(discoVoador[o].element.style.top) ){
                  if(space.element.contains(tiros[i].element)){
                    if(space.element.contains(discoVoador[o].element)){
      
                      destruido.push(new Destruido(x,o,discoVoador));
      
                      space.element.removeChild(tiros[i].element)
                      space.element.removeChild(discoVoador[o].element)
      
                      if (destruido[x] != undefined){
                        if(space.element.contains(destruido[x].element)){
                          Pontuacao = parseInt(Pontuacao) + 20
                          ponto.element.innerHTML =  String(Pontuacao).padStart(6, '0');
                          (function(x) {
                            setTimeout(function() {      
                              if (destruido[x] != undefined)  
                                if(space.element.contains(destruido[x].element))     
                                  space.element.removeChild(destruido[x].element)
                            }, 200);
                          })(x);
                        }
                      }
                      x++;
                    }
                  }
                }
              }
            }
          }
        }
      }

      //Disco voador atingiu jogador
      for(let e = discoVoador.length - 1 ; e >=0 ; e--){
        if (parseInt(discoVoador[e].element.style.left) + 91 > parseInt(ship.element.style.left)) {
          if (parseInt(discoVoador[e].element.style.left) < (parseInt(ship.element.style.left) + 98)) {
            if (parseInt(discoVoador[e].element.style.top) == parseInt(ship.element.style.top)) {
              if(space.element.contains(discoVoador[e].element)){
                
                space.element.removeChild(vidas[VidasLeft].element)
                VidasLeft -= 1
                console.log("atingiu")
                ship.element.src = "assets/playerDamaged.png";
                console.log(discoVoador[e])
                destruido.push(new Destruido(x,e,discoVoador));
      
                space.element.removeChild(discoVoador[e].element)
                
                
                //Imagem de nave destruida
                if (destruido[x] != undefined) {
                  if(space.element.contains(destruido[x].element)){
                    (function(x) {
                      setTimeout(function() {      
                        if (destruido[x] != undefined)  
                          if(space.element.contains(destruido[x].element))     
                            space.element.removeChild(destruido[x].element)
                      }, 200);
                  })(x);
                  }
                }
                
                // mudar a imagem para danificada e chamar set timeout com 5 segundos para mudar a imagem de volta para a normal 
                (function(ship) {
                  setTimeout(function() {      
                    ship.element.src = "assets/player.png"
                  }, 5000);
                })(ship);
              
      
                if (VidasLeft == 0) {
                  Morreu = true
                  m = 0
                  console.log("Morreu")
                }
      
                x+=1
              }
            }
          }
        }
      } 
    }

    if(Morreu == true){
      if(m == 0 ){
        Pause = true
        m++
        let textoMorte = new TextoMorte()
        let botao = new Botao();
        let button = document.getElementById(botao.element.id)
        button.onclick = function(){
          
          space.element.removeChild(textoMorte.element)
          space.element.removeChild(botao.element)

          discoVoador.forEach((e) => {
            if(space.element.contains(e.element)){
            space.element.removeChild(e.element)
            }}
          );

          asteroidSmall.forEach((e) => {
            if(space.element.contains(e.element)){
            space.element.removeChild(e.element)
            }}
          );

          asteroidBig.forEach((e) => {
            if(space.element.contains(e.element)){
            space.element.removeChild(e.element)
            }}
          );

          enemies.forEach((e) => {
            if(space.element.contains(e.element)){
            space.element.removeChild(e.element)
            }}
          );

          tiros.forEach((e) => {
            if(space.element.contains(e.element)){
            space.element.removeChild(e.element)
            }}
          );
          Pontuacao = 0
          if(space.element.contains(ponto.element)){
            space.element.removeChild(ponto.element)
          }

          console.log("botao")
          VidasLeft = 3
          Pause = false
          init()

        }
      }
      
    }
    console.log(VidasLeft)
  }

  
  if(Pause != true){
    setInterval(()=>{
      speed += 1
      console.log(speed)
  
    },60000)
  }
  
  init();

})();