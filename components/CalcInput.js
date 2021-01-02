import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CalcInput = (props) => {
    let style = {fontSize: 56};
    
    

    const length = props.expression.length;
    if(length > 15) {
        style = {fontSize: 20};
    } else if (length > 10) {
        style = {fontSize: 42};
    }
    
    const error = props.error && { color: 'red'};

    return (
    <Text 
        style={[styles.input, style, error]} 
        numberOfLines={1} 
        ellipsizeMode="head">
            {props.expression}
    </Text>
    );
}

const styles = StyleSheet.create({
    input: {
        color: '#fff',
        // borderStyle: 'solid', borderWidth: 1, borderColor: 'pink'
        
    }
});

export default CalcInput;