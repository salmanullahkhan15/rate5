import * as React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { API_URL, BASE_URL, USER_INFO, USER_ID } from '../utils/contants';
import apiFunctions from '../utils/GlobalFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Login({ navigation }) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onLogin = () => {

        console.log(username)
        console.log(password)

        if (username.length > 0 && password.length > 0) {

            let data = new FormData();

            data.append("username", username)
            data.append("password", password)

            apiFunctions.POST_REQUEST(BASE_URL + API_URL.LOGIN, data).then(res => {

                if (res.data == undefined || res.data == null) {
                    alert("Please enter correct username and password")
                    return false
                }

                AsyncStorage.setItem(USER_INFO, JSON.stringify(JSON.parse(res.data))).then(res => {
                })

                AsyncStorage.setItem(USER_ID, JSON.stringify(JSON.parse(res.data).Id)).then(res => {
                    navigation.replace('Home')
                })

            })
        } else {
            alert("Please enter correct username and password")
        }
    }

    // const onTest = async () => {

    //     // JSON.stringify(AsyncStorage.getItem(USER_INFO))
    //     // JSON.stringify(AsyncStorage.getItem(USER_ID))

    //     var userData = await AsyncStorage.getItem(USER_INFO);
    //     var userID = await AsyncStorage.getItem(USER_ID);

    //     alert(userData)
    //     alert(userID)
    // }


    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

                <Image
                    style={styles.loginLogo}
                    source={require('../assets/logo.png')}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        mode="outlined"
                        label="Username"
                        placeholder="Enter username"
                        onChangeText={(input) => setUsername(input)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Password"
                        secureTextEntry={true}
                        placeholder="Enter password"
                        onChangeText={(input) => setPassword(input)}
                    />
                    <Button style={styles.logButton} labelStyle={{ color: "white" }} mode="contained" onPress={onLogin}>
                        Login
                    </Button>
                    <Button style={styles.logButton} mode="outlined" onPress={() => navigation.push('Register')}>
                        Register
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    mainContainer: {
        width: wp("100%"),
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        width: wp("80%"),
        alignContent: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    textHead: {
        fontSize: 50,
        textAlign: 'center',
        marginTop: hp("10%"),
        color: "#FF5A65",
    },
    logButton: {
        marginTop: 20,
    },
    inputContainer: {
        marginTop: hp("5%")
    },
    loginLogo: {
        width: wp("20%"),
        height: hp("20%"),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp("10%"),
        resizeMode: 'contain'
    }

});
