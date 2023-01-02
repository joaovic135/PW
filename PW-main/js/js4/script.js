class IntegerSet {

  constructor(tam) {
    this.number = [tam];
    this.tam = tam;
  }

  inicializa() {
    for (let i = 0; i < this.tam; i++) {
      this.number[i] = false
    }
  }
  verifica(i){
    return this.number[i];
  }
  insere(i) {
    this.number[i] = true
  }

  remove(i) {
    this.number[i] = false
  }

  static Uniao(a , b) {

    let tam = a.tam + b.tam     
    let c = new IntegerSet(tam)
    for (let i = 0; i < tam; i++) {
      if (a.number[i] == true) {
        c.number[i] = true
      }else if (b.number[i] == true) {
        c.number[i] = true
      }else{
        c.number[i] = false
      }
      
    }
    return c;
  }
  
  static Inter(a , b) {

    let tam = a.tam + b.tam     
    let c = new IntegerSet(tam)
    for (let i = 0; i < tam; i++) {
      if (a.number[i] == true) {
        if (b.number[i] == true) {
          c.number[i] = true
        }else{
          c.number[i] = false
        }
      }else{
        c.number[i] = false
      }
      
      
    }
    return c;
  }


  static Difer(a , b) {

    let tam = a.tam + b.tam     
    let c = new IntegerSet(tam)
    for (let i = 0; i < tam; i++) {
      if (a.number[i] == true) {
        c.number[i] = true
        if(b.number[i] == true){
          c.number[i] = false
        }
        
      }else{
        c.number[i] = false
      }
      if(b.number[i] == true){
        if(a.number[i] == false){
          c.number[i] = false
        }
      }
      
      
    }
    return c;
  }

  imprimeString(){
    let a = []
    for(let i = 0 ; i < this.tam ; i++){
      if(this.number[i] == true){
        a.push(i)
      }
    }
    return a.toString()

  }
}


A = new IntegerSet(20)
B = new IntegerSet(20)
A.inicializa()
B.inicializa()
A.insere(5)
B.insere(2)
A.insere(2)
B.insere(6)
A.insere(1)

C = IntegerSet.Uniao(A,B)
D = IntegerSet.Inter(A,B)
E = IntegerSet.Difer(A,B)

console.log("C na posicao 5 "+ C.verifica(5))
console.log("C na posicao 4 "+C.verifica(4))


console.log("D na posicao 2 "+ D.verifica(2))
console.log("D na posicao 5 "+ D.verifica(5))
console.log("D na posicao 3 "+ D.verifica(3))


console.log("E na posicao 2 "+ E.verifica(2))
console.log("E na posicao 5 "+ E.verifica(5))
console.log("E na posicao 6 "+ E.verifica(6))
console.log("E na posicao 1 "+ E.verifica(1))

console.log("Conjunto A " + A.imprimeString())

