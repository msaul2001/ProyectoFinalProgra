import React from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, ImageBackground} from 'react-native';

const TarjetaScreen = ({navigation}) =>  {
    return (
        <View style={styles.container}>
            <Text> Estas en Tarjetas </Text>
        </View>
    )
}

export default TarjetaScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});