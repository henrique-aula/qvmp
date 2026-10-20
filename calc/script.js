const botoes = document.querySelectorAll('.botao');

var numeroAtual = 0;
var numeroMemoria = 0; 
var sinalMemoria = "";

for (var i = 0; i < botoes.length; i++){
    botoes[i].addEventListener('click', function() {
        
        var result = confirm("VOCÊ TEM CERTEZA QUE QUER APERTAR ESTE BOTÃO?");
        if (result){
            var alvoID = this.getAttribute('data-target');
            var valor = this.getAttribute('data-value');
            var alvo = document.getElementById(alvoID);
            var historico = document.getElementById('historico');

            if (alvo){
                switch (valor){
                    case "1":
                        numeroAtual++;
                        break;
                    case "-":
                    case "*":
                    case "/":
                        var result2 = confirm("VOCÊ TEM CERTEZA QUE FOI ESSE O SINAL QUE VOCÊ QUIZ APERTAR??")
                        if (result2){
                            historico.textContent += numeroAtual.toString() + valor;
                            numeroMemoria = numeroAtual;
                            numeroAtual = 0;
                            sinalMemoria = valor;
                        }
                        break;
                    case "ok":
                        var result3 = confirm("VOCÊ TEM CERTEZA QUE QUER EXECUTAR A OPERAÇÃO????")
                        if (result3){
                            historico.textContent += numeroAtual.toString();
                            switch (sinalMemoria){
                                case "-":
                                    numeroAtual = numeroMemoria - numeroAtual
                                    break;
                                case "*":
                                    numeroAtual = numeroMemoria * numeroAtual
                                    break;
                                case "/":
                                    numeroAtual = numeroMemoria / numeroAtual
                                    break;
                            }

                            historico.textContent += "=";
                            numeroMemoria = numeroAtual;
                            sinalMemoria = "";
                        }
                        break;
                }
                
                alvo.textContent = numeroAtual.toString();
            

            }
        }


    });
};