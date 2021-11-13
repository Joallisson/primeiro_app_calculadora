import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';


export default function App() {
  //=============== INÍCIO VARIÁVEIS ============================================================================
    const [darkMode, setDarkMode] = useState(false)
    const buttons = ['AC', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 3, 2, 1, '+', 0, '.', '+/-', '='] //vetor de botões

    const [currentNumber, setCurrentNumber] = useState("") //Número atual
    const [lastNumber, setLastNumber] = useState("") //Histórico
  //============== FIM VARIÁVEIS =============================================================================


  //=============== INÍCIO FUNÇÃO CALCULATOR ============================================================================
  function calculator(){ //Qualcular o resultado da igualdade
    const splitNumber = currentNumber.split(" ") //Dividir número
    const firstNumber = parseFloat(splitNumber[0]) //primeiro número da operação
    const lastNumber = parseFloat(splitNumber[2]) //Segundo número da operação
    const operator = splitNumber[1] //Operador da operação

    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + lastNumber).toString()) //Somando
        return;
      case '-':
        setCurrentNumber((firstNumber - lastNumber).toString()) //Subtraindo
        return
      case '/':
        setCurrentNumber((firstNumber / lastNumber).toString()) //Dividindo
        return
      case '*':
        setCurrentNumber((firstNumber * lastNumber).toString()) //Multiplicando
        return
    }
  }
  //============== FIM FUNÇÃO CALCULATOR =============================================================================


  //=============== INÍCIO FUNÇÃO HANDLEINPUT ============================================================================
  function handleInput(buttonPressed){
    //console.log(buttonPressed)
    if (buttonPressed === '+' | buttonPressed === '-' | buttonPressed === '/' | buttonPressed === '*') { //Se for alguma operação
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch (buttonPressed) { //Se pressionar algum botão especial
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length -1)))
        return;
      case 'AC':
        setCurrentNumber("")
        setLastNumber("")
        return;
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        return
      case '%':
        return
    }

    setCurrentNumber(currentNumber + buttonPressed) // 
  }
  //============== FIM FUNÇÃO HANDLEINPUT =============================================================================


  //=============== INÍCIO CUSTOMIZAÇÃO ============================================================================
  const styles = StyleSheet.create({
    screen: {
      flex: 1
    },
    results: { //Contéudo da tela da parte de cima
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      minHeight: '40%',
    },
    numbers: {
      alignItems: 'flex-end', //Alinha na horizontal
      justifyContent: 'flex-end', //Alinha na Vertical
    },
    historyText: { //Histórico dos cálculos
      color: darkMode ? "#f5f5f5" : "#282f3b",
      marginRight: 10,
      fontSize: 20,
    },
    resultText: { //Formata o texto
      color: darkMode ? '#f5f5f5' : '#282f38',
      marginRight: 10,
      fontSize: 40,
    },
    themeButton: { //Botão do dark mode
      alignSelf: 'flex-start',
      top: 20,
      marginBottom: 30,
      margin: 15,
      marginBottom: 70,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25, 
    },
    buttons: { //estilizando todos os botões
      height: '60%',
      flexDirection: "row", //organizar os botõe sem linha
      flexWrap: "wrap", //quando os botões renderizarem e chagarem na borda, ele devem ir para baixo e continuar renderizando
    },
    button: { //estilizando cada botão individualmente
      borderColor: darkMode ? "#3f4d5b" : "#e5e5e5",
      alignItems: 'center',
      borderWidth: 1,
      justifyContent: 'center',
      minWidth: '25%', //Tamanho dos butões
      minHeight: '20%', //Tamanho dos butões
    },
    textButton: {
      color: darkMode ? '#b5b5bb': '#7c7c7c',
      fontSize: 20,
    }
  });
  //============== FIM CUSTOMIZAÇÃO=============================================================================


  //=============== INÍCIO TELA PRINCIPAL ============================================================================
  return (
    <View style={styles.screen}>

      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
            <Entypo name={darkMode ? "light-up" : "moon"} size={24} color={darkMode ? "white" : "black"} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}/>
        </TouchableOpacity>
        <View style={styles.numbers}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.historyText} /*HISTÓRICO*/>{lastNumber}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.resultText} /*NÚMERO ATUAL*/>{currentNumber}</Text>
        </View>
        
      </View>

      <View style={styles.buttons}>
        {buttons.map((button) => button === '=' ? //Mapenado o vetor de botões
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#9DBC7B'}]}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textButton, {color: 'white', fontSize: 30}}>{button}</Text>
          </TouchableOpacity>
          ://Abaixo está sendo implementado 
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode ? '#414853' : '#ededed'}]}> 
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
      
    </View>
  );
  //============== FIM TELA PRINCIPAL =============================================================================
}


