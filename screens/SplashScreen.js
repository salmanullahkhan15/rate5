import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, BASE_URL, USER_INFO, USER_ID } from '../utils/contants';


function HomeScreen({ navigation }) {

    setTimeout(() => {
        AsyncStorage.getItem(USER_ID).then(res => {
            if (res == null || res == undefined) {
                navigation.replace('Login')
            } else {
                navigation.replace('Home')
            }
        })

    }, 5000);


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFFFFF" }}>
            <Image
                style={styles.splashLogo}
                source={require('../assets/logo.png')}
            />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    splashLogo: {
        width: wp("35%"),
        height: hp("35%"),
        resizeMode: 'contain'
    },

});
