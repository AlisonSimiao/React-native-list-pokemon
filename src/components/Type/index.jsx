import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';

function Type({nome, color}) {
  const  styled = StyleSheet.create({
      text: {
            textTransform: "capitalize",
            color: "white",
            paddingHorizontal: 5,
            paddingVertical: 3,
        },

    view:{
        borderWidth: 1,
        marginTop: 3,
        marginRight: 3,
        borderRadius: 50,
        backgroundColor: color
    }
  }) 
  
  return (
    <View style={styled.view}>
        <Text style={styled.text}>{`${nome}`}</Text>
    </View>
  )
}

export default Type