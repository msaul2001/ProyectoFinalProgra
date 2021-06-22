import React from 'react';
import { useState } from 'react/cjs/react.development';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, Picker} from 'react-native';

const ATarjetaScreen = ({navigation}) =>  {
    const [nTarjeta, setNTarjeta] = useState('');
    const [nCuenta, setNCuenta] = useState('');
    const [saldo, setSaldo] = useState('');

    const [selectedValue, setSelectedValue] = useState("titulo");

    return (
        <View style={styles.container}>
            <View style={styles.mainForm}>
                <Text 
                    style={styles.inputs}
                >
                    Añadir Nueva Tarjeta
                </Text>
            </View>
            <Text 
                style={styles.Textos}
            > 
                Tipo de Tarjeta
            </Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.Picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Tipos de Tarjetas" value="titulo" />
                <Picker.Item label="Crédito" value="Credito" />
                <Picker.Item label="Débito" value="Debito" />
            </Picker>
            <Text 
                style={styles.Textos}
            > 
                Número de Tarjeta
            </Text>
            <TextInput 
                style={styles.Cuadrados}
                placeholder="000000000000"
                autoCapitalize='none'
                keyboardType='Numeric'
                onChangeText={(numeroText) => setNTarjeta(numeroText)}
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
                Saldo Tarjeta
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
                    console.log(nTarjeta);
                    console.log(nCuenta);
                    console.log(saldo);
                            
                    let UsersParams = {'numtarjeta': nTarjeta, 'tipot': selectedValue, 
                                       'saldot': saldo, 'nocuenta': nCuenta}
        
                    fetch('http://127.0.0.1:5000/new_tarjeta/', 
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
                          console.log("Tarjeta Añadida");
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
                    Añadir Tarjeta
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ATarjetaScreen;

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