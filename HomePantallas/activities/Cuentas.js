import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, ImageBackground} from 'react-native';

const CuentaScreen = ({navigation}) =>  {
    return (
        <View style={styles.container}>
            <View style={styles.mainForm}>
                <Text style={styles.inputs}>
                    Cuentas Disponibles
                </Text>
            </View>
            <TouchableOpacity style={styles.botones}>
                <Text 
                    style={styles.Tbotones}
                > 
                    Añadir Cuenta
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonesE}>
                <Text 
                    style={styles.Tbotones}
                > 
                    Eliminar Cuenta
                </Text>
            </TouchableOpacity>

            <Text style={styles.to}> Nota: Una vez eliminadas podra añadirlas de nuevo en un plazo de 24h</Text>
        </View>
    )
}

export default CuentaScreen;

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
    }
});