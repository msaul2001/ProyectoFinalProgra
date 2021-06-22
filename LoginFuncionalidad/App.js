import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, ImageBackground} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import signUpScreen from './activities/SignUp.js'
import HomeScreen from './activities/Home.js'
import EfectivoScreen from './activities/Efectivo.js'
import CuentaScreen from './activities/Cuentas.js';
import TarjetaScreen from './activities/Tarjetas.js';
import DeudaScreen from './activities/Deudas.js';
import IngresosScreen from './activities/Ingresos.js';
import GastosScreen from './activities/Gastos.js';
import AñadirScreen from './activities/Añadir.js';
import ATarjetaScreen from './activities/AñadirT.js';
import ADeudaScreen from './activities/AñadirD.js';
import EliminacionCScreen from './activities/EliminacionC.js';
import EliminacionTScreen from './activities/EliminacionT.js';
import EliminacionDScreen from './activities/EliminacionD.js';


const image = {uri: 'https://i.pinimg.com/originals/e6/b4/56/e6b45616ff3a0549031642c599e5432a.jpg'}

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  global.usuarioL = username;

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.mainForm}>
          <TextInput 
            style={styles.inputs}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(usernameText) => setUsername(usernameText)}
          />

          <TextInput 
            style={styles.inputs}
            placeholder="Password"
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(passwordText) => setPassword(passwordText)}
          />

          <TouchableOpacity 
            style={styles.mainButton}
            onPress={() => {
              console.log(password);
              console.log(username);
              
              let UsersParams = {'username': username, 'password': password}

              fetch('http://127.0.0.1:5000/login/', 
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(UsersParams)
              })
                .then(response => response.json())
                .then(data => {
                  if(data.Salida == true){
                    console.log("Login Permitido");
                    navigation.navigate('Home');
                  } else {
                    console.log("Login NO Permitido");
                  }
                })
            }}
          >
            <Text style={styles.mainButtonText} > LogIn </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text 
              style={styles.signUp}
              onPress={() => {navigation.navigate('SignUp')}}
            > 
              ¿No tienes cuenta? Crear una Cuenta
            </Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  );
}

const AppNavigator = createStackNavigator({
  LogIn: {
    screen: LoginScreen
  },

  SignUp: {
    screen: signUpScreen
  },

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
  }, 

  Ingresos: {
    screen: IngresosScreen
  },

  Gastos: {
    screen: GastosScreen
  },

  Nueva_Cuenta: {
    screen: AñadirScreen
  },

  Nueva_Tarjeta: {
    screen: ATarjetaScreen
  },

  Nueva_Deuda: {
    screen: ADeudaScreen
  }, 

  Eliminacion_Cuentas: {
    screen: EliminacionCScreen
  }, 

  Eliminacion_Tarjetas: {
    screen: EliminacionTScreen
  },

  Eliminacion_Deudas: {
    screen: EliminacionDScreen
  }
}, {
  initialRouteName: 'LogIn'
})

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center'
  },
  mainForm: {
    height: 450,
    borderRadius: 50,
    opacity: 0.85,
    width: 360,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 

  inputs: {
    fontSize: 25,
    width: 320,
    height: 55,
    color: 'black',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#364954',
    margin: 15,
    paddingLeft: 20
  },

  mainButton: {
    backgroundColor: '#364954',
    margin: 15,
    height: 50,
    borderRadius: 30,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },

  mainButtonText:{
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },

  signUp:{
    fontSize: 15,
    color: '#364954',
    fontWeight: 'bold'
  }

});

//Paleta de Colores
//#99A7B0
//#364954
//#9AAEBB
//#B8A18C
//#836D5A
