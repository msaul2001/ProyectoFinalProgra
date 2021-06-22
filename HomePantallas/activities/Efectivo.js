import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, ImageBackground, LinearGradient} from 'react-native';

const EfectivoScreen = ({navigation}) =>  {
    return (
        <View style={styles.container}>
            <View style={styles.mainForm}>
                <Text 
                    style={styles.inputs}
                >
                    Efectivo
                </Text>
            </View>
            
            <View style={styles.formSecundario}>
                <Text 
                    style={styles.inputs2}
                >
                    Monto Total
                </Text>
            </View>

            <TouchableOpacity style={styles.botones}>
                <Text 
                    style={styles.Tbotones}
                > 
                    Ingreso
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonesE}>
                <Text 
                style={styles.Tbotones}
                > 
                Gasto
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default EfectivoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainForm: {
    height: 80,
    width: '100%',
    backgroundColor: '#364954',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  inputs: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
  inputs2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  botones: {
    backgroundColor: '#9AAEBB',
    marginTop: 15,
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 170,
  },
  botonesE: {
    backgroundColor: '#bf3535',
    marginTop: -50,
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 170,
    marginBottom: 20,
  },
  Tbotones: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  },

  to: {
    color: 'grey',
    fontSize: 10
  },
  formSecundario: {
    height: 183,
    width: '100%',
    backgroundColor: '#4c669f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});