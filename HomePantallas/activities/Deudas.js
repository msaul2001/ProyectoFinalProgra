import React from 'react';
import { StyleSheet, Text, View, TextInput, 
  TouchableOpacity, ImageBackground} from 'react-native';

const DeudaScreen = ({navigation}) =>  {
    return (
        <View style={styles.container}>
            <Text> Estas en Deudas </Text>
        </View>
    )
}

export default DeudaScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});