import React from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, Picker} from 'react-native';
import { useState } from 'react/cjs/react.development';

const AñadirScreen = ({navigation}) =>  {

    const [banco, setBanco] = useState('');
    const [nCuenta, setNCuenta] = useState('');
    const [propietario, setPropietario] = useState('');
    const [saldo, setSaldo] = useState('');

    const [selectedValue, setSelectedValue] = useState("titulo");

    return (
        <View style={styles.container}>
            <View style={styles.mainForm}>
                <Text 
                    style={styles.inputs}
                >
                    Tipo de Cuenta
                </Text>
            </View>
            <Text 
                style={styles.Textos}
            > 
                Selecione el Tipo de Cuenta
            </Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.Picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Tipos de Cuentas" value="titulo" />
                <Picker.Item label="Ahorro" value="Ahorro" />
                <Picker.Item label="Corriente" value="Corriente" />
                <Picker.Item label="Nomina" value="Nomina" />
                <Picker.Item label="Remuneración" value="Remunerada" />
                <Picker.Item label="Chequera" value="Chequera" />
                <Picker.Item label="Dolares" value="Dolares" />
            </Picker>

            <Text 
                style={styles.Textos}
            > 
                Banco
            </Text>
            <TextInput 
                style={styles.Cuadrados}
                placeholder="Banco Preferido"
                autoCapitalize='none'
                onChangeText={(bancoText) => setBanco(bancoText)}
            />
            <Text 
                style={styles.Textos}
            > 
                Numero de Cuenta
            </Text>
            <TextInput 
                style={styles.Cuadrados}
                placeholder="000000000000"
                autoCapitalize='none'
                keyboardType='Numeric'
                onChangeText={(cuentaText) => setNCuenta(cuentaText)}
            />
            <Text 
                style={styles.Textos}
            > 
                Nombre del Propietario
            </Text>
            <TextInput 
                style={styles.Cuadrados}
                placeholder="Nombre y Apellido"
                autoCapitalize='none'
                onChangeText={(propietarioText) => setPropietario(propietarioText)}
            />
              <Text 
                style={styles.Textos}
            > 
                Saldo Cuenta
            </Text>
            <TextInput 
                style={styles.Cuadrados}
                placeholder="Saldo Disponible"
                autoCapitalize='none'
                keyboardType='Numeric'
                onChangeText={(saldoText) => setSaldo(saldoText)}
            />

            <TouchableOpacity 
                style={styles.cerrar}
                onPress={() => {
                    console.log(selectedValue);
                    console.log(banco);
                    console.log(propietario);
                    console.log(nCuenta);
                    console.log(saldo);
                    console.log(usuarioL);
                            
                    let UsersParams = {'tipo': selectedValue, 'banco': banco, 'numcuenta': nCuenta, 
                                       'nompropietario': propietario, 'saldocuenta': saldo}
        
                    fetch(`http://127.0.0.1:5000/new_cuenta/${usuarioL}`, 
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
                          console.log("Cuenta Añadida");
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
                    Añadir Cuenta
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AñadirScreen;

const styles = StyleSheet.create({
    container: {
        padding: 0,
        backgroundColor: '#F2F2F2',
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
    },
    mainForm: {
        height: 100,
        width: '100%',
        backgroundColor: '#364954',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25  
    }, 
    inputs: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    Tbotones: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    cerrar: {
        backgroundColor: '#9AAEBB',
        marginTop: 15,
        height: 50,
        width: 310,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    Picker: {
        width: 290,
        height: 50,
        borderRadius: 30,
        marginBottom:10,
        paddingLeft: 20
    }
});