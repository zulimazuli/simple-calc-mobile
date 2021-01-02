import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';
import CalcButton from './components/CalcButton';
import CalcInput from './components/CalcInput';

export default function App() {
  const [expression, setExpression] = useState(['0']);
  const [processed, setProcessed] = useState(false);
  const [error, setError] = useState(false);

  const expressionChangedHandler = (exp) => {
    if(processed) {
      if(!isNaN(exp) || error) {
        setExpression(['0']);
      }
      setProcessed(false);
      setError(false);
    }

    switch(exp) {
      case 'C':
        setExpression(['0']);
        break;
      case '=':
        // setExpression(prev => [eval(prev.join()).toString()]);
        try {
          const result = [eval(expression.join(''))]
          setExpression(result);
        } catch {
          setError(true);
          setExpression(['ERROR!']);
        }   
        setProcessed(true);
        break;
      case 'DEL':
        //todo 
        break;
      case '.':
        setExpression(prev => {
          const num = prev[prev.length - 1];
          if(!isNaN(num) && !num.toString().includes('.'))
          {           
            const arr = [...prev];
            arr.pop();
            return [...arr, "" + num + exp];
          }
          else {
            return [...prev];
          }
        });
        break;
      default:        
        setExpression(prev => {
          const lastNum = prev[prev.length - 1]
          if((!isNaN(exp) && !isNaN(lastNum)) || exp === '.')
          {
            const num = parseFloat("" + lastNum + exp);
            const arr = [...prev];
            arr.pop();
            return [...arr, num];
            
          } else if(isNaN(exp) && isNaN(lastNum)) {
            const arr = [...prev];
            arr.pop();
            return [...arr, exp];

          } else {
            return [...prev, exp];
          }          
        });
    }
  }

  const numArray = [9, 8, 7, 6, 5, 4, 3, 2, 1, '.', 0, 'C'];
  const operationsArray = ['+', '-', '*', '/']

  const numGrid = numArray.map(num => {
    return <CalcButton key={num} for={num} pressed={expressionChangedHandler} grid/>;
  });

  const operatiosGrid = operationsArray.map((op, id) => {
    return <CalcButton key={id} for={op} pressed={expressionChangedHandler}/>;
  });
  
  return (
    <TouchableWithoutFeedback accessible={false}>
    <View style={styles.container}>
      <StatusBar style="auto" />

      <CalcInput expression={expression.join('')} error={error}/>

      <View style={styles.grid}>
        <View style={styles.numericBoard}>
          {numGrid}
        </View>
        <View style={{flexDirection: 'column', width: '25%'}}>
          {operatiosGrid}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <CalcButton disabled for="DEL" pressed={expressionChangedHandler} style={{backgroundColor: '#8ED081', width: '48.25%'}} textStyle={{fontSize: 20}}/>
          <CalcButton for="=" pressed={expressionChangedHandler} style={{backgroundColor: '#8ED081', width: '48.25%'}}/>
        </View>        
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'flex-end',
    flexDirection: 'column',
    paddingTop: 40,
  },
  grid: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  numericBoard: {
    flexWrap: 'wrap', 
    flexDirection:'row-reverse',
    justifyContent: 'space-evenly',
    width: '75%',
    // borderStyle: 'solid', borderWidth: 1, borderColor: 'pink'
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'steelblue'
  }
});
