import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, ImageBackground} from 'react-native';

const TarjetaScreen = ({navigation}) =>  {
  const [data, setData] = useState([]);

  useEffect(() => {        
    fetch(`http://127.0.0.1:5000/tarjetas/${usuarioL}`, 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson)
        //console.log(typeof responseJson);
      })
  },[]);

  console.log(data)

  const listItems = data.map((number) =>
    <Text style={styles.cuentas}>{number}</Text>
  );

  console.log(listItems)

  return (
    <View style={styles.container}>
      <View style={styles.mainForm}>
        <Text 
          style={styles.inputs}
        >
          Tarjetas
        </Text>
      </View>

      <View style={styles.cuentasV}>
        {listItems}
      </View>

      <TouchableOpacity 
        style={styles.botones}
        onPress = {() => {navigation.navigate('Nueva_Tarjeta')}}
      >
        <Text 
          style={styles.Tbotones}
        > 
          Añadir Tarjeta
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.botonesE}
        onPress = {() => {navigation.navigate('Eliminacion_Tarjetas')}}
      >
        <Text 
          style={styles.Tbotones}
        > 
          Eliminar Tarjeta
        </Text>
      </TouchableOpacity>
    
      <TouchableOpacity 
        style={styles.botones}
        onPress = {() => {navigation.navigate('Ingresos')}}
      >
        <Text 
          style={styles.Tbotones}
        > 
          Ingreso
        </Text>
      </TouchableOpacity>
    
      <TouchableOpacity 
        style={styles.botonesE}
        onPress = {() => {navigation.navigate('Gastos')}}
      >
        <Text 
          style={styles.Tbotones}
        > 
          Gasto
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default TarjetaScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
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
  cuentas: {
    color: 'Black',
    fontSize: 18,
    fontWeight: 'bold'
  }, 
  cuentasV : {
    width: '78%',
    backgroundColor: '#F2F2F2',
    alignItems: 'left',
    justifyContent: 'left',
    marginLeft: '2%',
    marginTop: 15,
    borderBottomColor: '#9AAEBB',
    borderBottomWidth: 2,
  }
});