import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ImagePropTypes } from 'react-native'

 const CalcButton = (props) => {

    let buttonStyles = [styles.button];
    let textStyles = [styles.title, props.textStyle];

    if(isNaN(props.for)) {
      buttonStyles = [...buttonStyles, styles.operation] 
    } else {
      buttonStyles = [...buttonStyles, styles.numeric] 
    }

    if(props.style) {
      buttonStyles = [...buttonStyles, props.style] 
    }

    if(props.grid) {
      buttonStyles = [...buttonStyles, styles.grid] 
    }

    if(props.disabled) {
      buttonStyles = [...buttonStyles, styles.disabled] 
      textStyles = [...textStyles, styles.disabled]
    }

    let button = (
      <TouchableOpacity 
      style={buttonStyles} 
      activeOpacity={0.5} 
      onPress={() => props.pressed(props.for)}
      disabled={props.disabled}>
           <Text style={textStyles}>{props.for}</Text>
      </TouchableOpacity>);

    return (button)
};

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      height: 75,
      margin: 3,
    },
    grid: {
      flexBasis: '31%',
    },
    numeric: {
      backgroundColor: '#999',
    },
    operation: {
      backgroundColor: '#8ED081',
    },
    disabled: {
      color: '#888',
      backgroundColor: '#777'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    }
  });
  
  export default CalcButton;