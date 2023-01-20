(function () {

  const TAMX = 600;
  const TAMY = 800;
  const FPS = 200;

  var speed = 1
  var x =0
  var i = 0
  var od = 0
  var Pause = true;
  var Lposi = 500;
  var VidasLeft = 3;
  var Pontuacao = 0;

  const PROB_ENEMY_SHIP = 0.5

  let space, ship , ponto;
  let enemies = [];
  let vidas = [3];
  let tiros = [];
  let destruido = [];

  function init() {
    space = new Space();
    ship = new Ship();

    for (i = 0; i < 3; i++) {
      vidas.push(new Life(i))
      vidas[i + 1].element.style.left = `${parseInt(Lposi) - 50}px`
      Lposi -= 50;
    }
    Lposi = 500;

    ponto = new Pontos();

    const interval = window.setInterval(run, 1000/200);

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
    constructor(id) {
      this.element = document.createElement("img");
      this.element.id = id
      this.element.className = "life";
      this.element.src = "assets/life.png";
      this.element.style.top = "0px";
      this.element.style.left = "500px";
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

  class Destruido{
    constructor(id , a){
      this.element = document.createElement("img");
      this.element.id = id;
      this.element.className = "destroy";
      this.element.src = "assets/laserRedShot.png";
      this.element.style.top= enemies[a].element.style.top;
      this.element.style.left= enemies[a].element.style.left;
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

      //Tiro encostou em nave inimiga 
      for (let i = tiros.length - 1; i >= 0; i--) {
        for (let o = enemies.length - 1; o >= 0; o--) {
          if (enemies[o] != undefined) {

            if (parseInt(tiros[i].element.style.left) > (parseInt(enemies[o].element.style.left))) {
              if (parseInt(tiros[i].element.style.left) < (parseInt(enemies[o].element.style.left) + 92)) {

                if (parseInt(tiros[i].element.style.top) <= parseInt(enemies[o].element.style.top) + 45 && parseInt(tiros[i].element.style.top) >= parseInt(enemies[o].element.style.top) )   {
                  if (space.element.contains(tiros[i].element)) {
                    if (space.element.contains(enemies[o].element)) {

                      destruido.push(new Destruido(x,o));
                      
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
      enemies.forEach((e) => {
        if (parseInt(e.element.style.left) + 98 > parseInt(ship.element.style.left)) {
          if (parseInt(e.element.style.left) < (parseInt(ship.element.style.left) + 98)) {
            if (parseInt(e.element.style.top) == parseInt(ship.element.style.top)) {
              if(space.element.contains(e.element)){
              //space.element.removeChild(vidas[VidasLeft].element)
                VidasLeft -= 1
                console.log("atingiu")
                ship.element.src = "assets/playerDamaged.png";

                (function(ship) {
                  setTimeout(function() {      
                    ship.element.src = "assets/player.png"
                  }, 5000);
                })(ship);
                // mudar a imagem para danificada e chamar set timeout com 5 segundos para mudar a imagem de volta para a normal 
              

                if (VidasLeft == 0) {
                  console.log("Morreu")
                }
              }
            }
          }
        }
      })
      
    }

  }

  setInterval(()=>{
    speed += 1
    console.log(speed)

  },60000)
  init();

})();