import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import EfectivoScreen from './activities/Efectivo.js';
import CuentaScreen from './activities/Cuentas.js';
import TarjetaScreen from './activities/Tarjetas.js';
import DeudaScreen from './activities/Deudas.js';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainForm}>
        <Text style={styles.texto}>
          Monto Total
        </Text>
      </View>
      {/*Boton Cuentas*/}
      <TouchableOpacity style={styles.botones}>
        <Text 
          style={styles.Tbotones}
          onPress={() => {navigation.navigate('Cuentas')}}
        > 
          Cuentas
        </Text>
      </TouchableOpacity>

      {/*Boton Efectivo*/}
      <TouchableOpacity style={styles.botonesE}>
        <Text 
          style={styles.Tbotones}
          onPress={() => {navigation.navigate('Efectivo')}}
        > 
          Efectivo
        </Text>
      </TouchableOpacity>

      {/*Boton Tarjetas*/}
      <TouchableOpacity style={styles.botones}>
        <Text 
          style={styles.Tbotones}
          onPress={() => {navigation.navigate('Tarjetas')}}
        > 
          Tarjetas
        </Text>
      </TouchableOpacity>

      {/*Boton Deudas*/}
      <TouchableOpacity style={styles.botonesE}>
        <Text 
          style={styles.Tbotones}
          onPress={() => {navigation.navigate('Deudas')}}
        > 
          Deudas
        </Text>
      </TouchableOpacity>

      <Text style={styles.textoR}>
        Resumen de los Últimos Registros
      </Text>

      <TouchableOpacity style={styles.cerrar}>
        <Text 
          style={styles.Tbotones}
        > 
          Cerrar Sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },

  Efectivo: {
    screen: EfectivoScreen
  },

  Cuentas: {
    screen: CuentaScreen
  },

  Tarjetas: {
    screen: TarjetaScreen
  },

  Deudas: {
    screen: DeudaScreen
  }
}, {
  initialRouteName: 'Home'
})

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainForm: {
    height: 200,
    width: '100%',
    backgroundColor: '#364954',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  texto: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
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
    backgroundColor: '#B8A18C',
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
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  textoR: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cerrar: {
    backgroundColor: '#B8A18C',
    marginTop: 15,
    height: 50,
    width: 310,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  }
});
