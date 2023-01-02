function entrada(i) {

    if (i == 1) {

        return "Pedra"

    } else if (i == 2) {

        return "Papel"

    } else if (i == 3) {

        return "Tesoura"

    } else {

        return "Invalido"

    }
}

function main() {

    let pontuacao = 0
    let perdeu = false
    let rodada
    let jogador

    console.log(`
        Escolha sua jogada:
        1 - Pedra
        2 - Papel 
        3 - Tesoura
    `)

    while (!perdeu) {
        jogador = parseInt(prompt());
""
        rodada = Math.floor((Math.random() * 3) + 1);

        if (entrada(jogador) === "Invalido") {

            jogador = Math.floor((Math.random() * 3) + 1);
            console.log("Entrada invalida, escolhido opção " + jogador +" "+ entrada(jogador))
        }

        console.log("O computador jogou "+entrada(rodada))

        if (entrada(jogador) === entrada(rodada)){

            console.log("A rodada empatou")

        }else{
            if(entrada(jogador) === "Papel" && rodada === 1 ){
                console.log("Voce ganhou!")
                pontuacao++;                
            }
            if(entrada(jogador) === "Papel" && rodada === 3 ){
                perdeu = true;                
            }               
            if(entrada(jogador) === "Pedra" && rodada === 3 ){
                console.log("Voce ganhou!")
                pontuacao++;                
            }
            if(entrada(jogador) === "Pedra" && rodada === 2 ){
                perdeu = true;                
            }
            if(entrada(jogador) === "Tesoura" && rodada === 2 ){
                console.log("Voce ganhou!")
                pontuacao++;                
            }
            if(entrada(jogador) === "Tesoura" && rodada === 1 ){
                perdeu = true;                
            }
        }

    }
    console.log("Voce perdeu! A sua pontuação foi de " + pontuacao);
}
main();