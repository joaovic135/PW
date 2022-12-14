class Venda{
   constructor(ID , Qt , preco){
       this.ID = ID 
       this.Qt = Qt 
       this.preco = preco
   }
   
   SetID(Id){
        this.ID = ID
   }
   GetID(){
       return this.ID
   }

   SetQt(qt){
       this.Qt = qt
   }

   GetQt(){
       return this.Qt
    }

    SetPreco(preco){
        this.preco = preco
    }

    GetPreco(){
        return this.preco
    }

    GetValotTotal(){
        return this.Qt * this.preco
    }
}


let v1 = new Venda(01 , 2 , 25)
let v2 = new Venda (02, 3 , 5)
console.log(v1.GetValotTotal())
console.log(v2.GetValotTotal())