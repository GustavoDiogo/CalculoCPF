$(document).ready(function(){
  $("#input").change(function(){
    var j = 0;
    var cpfsemdigito = [];
    var cpf = $("#input").val();

    if(cpf != "000.000.000-00"
      && cpf != "111.111.111-11"
      && cpf != "222.222.222-22"
      && cpf != "333.333.333-44"
      && cpf != "555.555.555-55"
      && cpf != "666.666.666-66"
      && cpf != "777.777.777-77"
      && cpf != "888.888.888-88"
      && cpf != "999.999.999-99")
    {
      // O tamanho total do cpf é 14 pois conta-se os '.'' e os '-'
      for (var i = 0; i < 14; i++){
        if(cpf[i] !== '.' && cpf[i] !== '-'){
          //Armazena num index novo pois se for utilizar o index i, irá armazenar em posições inválidas             
          cpfsemdigito[j] = cpf[i]; 
          j++;
        }            
      }
      // O peso1 decrementa até 2

      var peso1 = 10;
      var totalsoma1 = 0;

      // i se extende até 9 pois não se usa os dois dígitos finais para a soma

      for(i = 0; i < 9;i++){            
        totalsoma1 = totalsoma1 + cpfsemdigito[i]*peso1;
        peso1--;              
      }

      //O resto da divisão subtrai-se com o 11, se for maior que 9 o primeiro dígito tem que ser 0 para ser considerado um CPF válido

      var restodasoma1 = totalsoma1%11;
      var totalsubtracao1 = 11 - restodasoma1;
      var primeiravalidacao = false;

      //Checando se o primeiro dígito do CPF condiz com a conta;
      if(totalsubtracao1 >= 10){
        //O primeiro dígito faz com que o CPF seja válido, agora é necessário calcular o segundo dígito.      
        switch(cpf[12]){                  
          case "0":
          primeiravalidacao = true;
          break

          default:
          alert("O CPF digitado não existe");
          $("#consultar").prop("disabled","disabled");
          break; 
        }            
      }              
      else{
      //Caso for menor que 9, então o primeiro dígito tem que ser igual ao total da subtração

        //Transformando a string do primeiro dígito em inteiro para checar se é igual ao total da subtração        
        switch(parseInt(cpf[12])){                  
          case totalsubtracao1:
          primeiravalidacao = true;
          break;
          default:
          alert("O CPF digitado não existe");
          $("#consultar").prop("disabled","disabled");
          break; 
        }             
      }
     //Checando se o segundo dígito é válido, caso a primeira validação for verdadeira

      if(primeiravalidacao == true){
        // O peso2 decrementa até 2

        var peso2 = 11;      
        var totalsoma2 = 0;
        // i se extende até 10 pois se usa até o primeiro dígito do CPF

        for(i = 0; i < 10;i++){            
          totalsoma2 = totalsoma2 + cpfsemdigito[i]*peso2;
          peso2--;              
        }

        var restodasoma2 = totalsoma2%11;
        var totalsubtracao2 = 11 - restodasoma2;
        var segundavalidacao = false;
        //Se for maior que 9 o segundo dígito tem que ser 0 para ser considerado um CPF válido
        if(totalsubtracao2 >= 10){        
          switch(cpf[13]){                  
              case "0":
              segundavalidacao = true;
              break

              default:
              alert("O CPF digitado é inválido");
              break; 
          }
        }              
        else{
          //Caso for menor que 9, então o segundo dígito tem que ser igual ao total da subtração 2  

          //Transformando a string do segundo dígito em inteiro para checar se é igual ao total da subtração 2
          switch(parseInt(cpf[13])){                  
            case totalsubtracao2:
            segundavalidacao = true;
            break;

            default:
            alert("O CPF digitado é inválido");
            break; 
          }                  
        }
      }
    }

    else{
        alert("O CPF digitado é inválido");
    }         

  });
});