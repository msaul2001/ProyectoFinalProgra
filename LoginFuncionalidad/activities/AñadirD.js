import React from 'react';
import { useState } from 'react/cjs/react.development';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, Picker} from 'react-native';

const ADeudaScreen = ({navigation}) =>  {
    const [monto, setMonto] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [selectedValue, setSelectedValue] = useState("titulo");

    return (
        <View style={styles.container}>
            <View style={styles.mainForm}>
                <Text 
                    style={styles.inputs}
                >
                    Añadir Nueva Deuda
                </Text>
            </View>
            <Text 
                style={styles.Textos}
            > 
                Monto
            </Text>
            <TextInput 
                style={styles.Cuadrados}
                placeholder="$20,000.00"
                keyboardType='Numeric'
                onChangeText={(montoText) => setMonto(montoText)}
            />
            <Text 
                style={styles.Textos}
            > 
                Categoria
            </Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.Picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Tipos de Categorias" value="titulo" />
                <Picker.Item label="Comida o Bebida" value="1" />
                <Picker.Item label="Compras" value="2" />
                <Picker.Item label="Vivienda" value="3" />
                <Picker.Item label="Transporte" value="4" />
                <Picker.Item label="Vehiculos" value="5" />
                <Picker.Item label="Vida" value="6" />
                <Picker.Item label="Entretenimiento" value="7" />
                <Picker.Item label="Comunicaciones" value="8" />
                <Picker.Item label="Gastos Financieros" value="9" />
                <Picker.Item label="Inversiones" value="10" />
                <Picker.Item label="Ingresos" value="11" />
                <Picker.Item label="Otros" value="12" />
            </Picker>
            <Text 
                style={styles.Textos}
            > 
                Descripción Categoria
            </Text>
            <TextInput 
                style={styles.Cuadrados}
                placeholder="Descripción"
                onChangeText={(descripcionText) => setDescripcion(descripcionText)}
            />

            <TouchableOpacity 
                style={styles.cerrar}
                onPress={() => {
                    console.log(selectedValue);
                    console.log(monto);
                    console.log(descripcion);
                            
                    let UsersParams = {'monto': monto, 'descripcion': descripcion, 
                                       'Idcategoria': selectedValue}
        
                    fetch(`http://127.0.0.1:5000/new_deuda/${usuarioL}`, 
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
                          console.log("Deuda Añadida");
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

export default ADeudaScreen;

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
        marginBottom:20,
        paddingLeft: 20
    }
});