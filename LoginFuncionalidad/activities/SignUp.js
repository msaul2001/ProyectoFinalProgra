import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity} from 'react-native';

const signUpScreen = ({navigation}) =>  {
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  global.usuarioL = username;

  return (
    <View style={styles.container}>
      <View style={styles.mainForm}>
        <Text 
          style={styles.inputs}
        >
          Creación de Cuenta
        </Text>
      </View>

      <View style={styles.m}>
        <Text 
          style={styles.Textos}
        > 
          Nombre Completo
        </Text>
        <TextInput 
          style={styles.Cuadrados}
          placeholder="Nombre Completo"
          onChangeText={(nombreText) => setNombre(nombreText)}
        />

        <Text 
          style={styles.Textos}
        > 
          Usuario
        </Text>
        <TextInput 
          style={styles.Cuadrados}
          placeholder="Usuario"
          autoCapitalize='none'
          onChangeText={(usuarioText) => setUsername(usuarioText)}
        />

        <Text 
          style={styles.Textos}
        > 
          Edad
        </Text>
        <TextInput 
          style={styles.Cuadrados}
          placeholder="Edad"
          autoCapitalize='none'
          onChangeText={(edadText) => setEdad(edadText)}
          keyboardType='Numeric'
        />

        <Text 
          style={styles.Textos}
        > 
          Email
        </Text>
        <TextInput 
          style={styles.Cuadrados}
          placeholder="ejemplo@ejemplo.com"
          autoCapitalize='none'
          onChangeText={(correoText) => setCorreo(correoText)}
        />

        <Text 
          style={styles.Textos}
        > 
          Contraseña
        </Text>
        <TextInput 
          style={styles.Cuadrados}
          placeholder="Contraseña"
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={(contraseniaText) => setContrasenia(contraseniaText)}
        />
        <TouchableOpacity 
          style={styles.botones}
          onPress={() => {
            console.log(nombre);
            console.log(username);
            console.log(edad);
            console.log(correo);
            console.log(contrasenia);
                    
            let UsersParams = {'username': username, 'nombres': nombre, 'password': contrasenia, 
                               'edad': edad, 'correo': correo}

            fetch('http://127.0.0.1:5000/new_user/', 
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
                  console.log("Usuario Creado");
                  navigation.navigate('Home');
                } else {
                  console.log("ERROR");
                }
              })
          }}
        >
          <Text 
            style={styles.Tbotones}
          > 
            Crea tu Cuenta
          </Text>
        </TouchableOpacity>
      </View> 
    </View>
  )
}

export default signUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainForm: {
    height: 100,
    width: '100%',
    backgroundColor: '#364954',
    alignItems: 'center',
    justifyContent: 'center'   
  }, 
  inputs: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  botones: {
    backgroundColor: '#A63116',
    marginTop: 25,
    height: 50,
    width: 325,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  Tbotones: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  to: {
    color: 'grey',
    fontSize: 10
  },
  m:{
    marginTop: 20, 
    height: 510,
    borderRadius: 50,
    opacity: 0.85,
    width: 360,
    backgroundColor: '#DEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Textos: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#101010',
    marginBottom: 5
  },
  Cuadrados: {
    height: 55,
    width:290 ,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 20,  
    marginLeft: -5,
    marginBottom:20,
    borderRadius: 30,
    paddingLeft: 20
  }
});