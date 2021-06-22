import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity} from 'react-native';

const EliminacionDScreen = ({navigation}) =>  {
    const [numero, setNumero] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.mainForm}>
                <Text 
                    style={styles.inputs}
                >
                    Eliminación de Deudas 
                </Text>
            </View>
            <Text 
                style={styles.Textos}
            > 
                Monto de la Deuda a Borrar
            </Text>
            <TextInput 
                style={styles.Cuadrados}
                placeholder="$20,000.00"
                keyboardType='Numeric'
                onChangeText={(numeroText) => setNumero(numeroText)}
            />

            <TouchableOpacity 
                style={styles.cerrar}
                onPress={() => {
                    console.log(numero);
                            
                    let UsersParams = {'monto': numero}
        
                    fetch(`http://127.0.0.1:5000/delete_deuda/${usuarioL}`, 
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
                          console.log("Deuda Eliminada con Exito");
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
                    Eliminar Deuda
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default EliminacionDScreen;

const styles = StyleSheet.create({
    container: {
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
        marginBottom: 50  
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