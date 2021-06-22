import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, 
  SafeAreaView, ScrollView } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = ({navigation}) => {

  const [data, setData] = useState([]);
  
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/inicio/${usuarioL}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setData(responseJson)
      //console.log(typeof responseJson);
    })
  });

  console.log(data)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainForm}>
        <Text style={styles.texto}>
          Monto Total: 
        </Text>
        <Text style={styles.texto}>
          {data}
        </Text>
      </View>
      {/*Boton Cuentas*/}
      <TouchableOpacity 
        style={styles.botones}
        onPress={() => {navigation.navigate('Cuentas')}}
      >
        <Text 
          style={styles.Tbotones}
        > 
          Cuentas
        </Text>
      </TouchableOpacity>

      {/*Boton Efectivo*/}
      <TouchableOpacity 
        style={styles.botonesE}
        onPress={() => {navigation.navigate('Efectivo')}}
      >
        <Text 
          style={styles.Tbotones}
        > 
          Efectivo
        </Text>
      </TouchableOpacity>

      {/*Boton Tarjetas*/}
      <TouchableOpacity 
        style={styles.botones}
        onPress={() => {navigation.navigate('Tarjetas')}}
      >
        <Text 
          style={styles.Tbotones}
        > 
          Tarjetas
        </Text>
      </TouchableOpacity>

      {/*Boton Deudas*/}
      <TouchableOpacity 
        style={styles.botonesE}
        onPress={() => {navigation.navigate('Deudas')}}
      >
        <Text 
          style={styles.Tbotones}
        > 
          Deudas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.cerrar}
        onPress ={() => {
          navigation.navigate('LogIn');
        }}
      >
        <Text 
          style={styles.Tbotones} 
        > 
          Cerrar Sesión
        </Text>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Text>Para refrescar la pantalla deslice hacia abajo</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
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
    backgroundColor: '#A63116',
    marginTop: 15,
    height: 50,
    width: 310,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  }
});
