import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Text, TextInput, Button } from 'react-native-paper';
import { API_URL, BASE_URL, USER_INFO, USER_ID } from '../utils/contants';
import apiFunctions from '../utils/GlobalFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Register({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const onRegister = () => {

        if (password === confirmPassword) {

            if (name.length > 0 && password.length > 0 && email.length > 0 && address.length > 0) {

                let data = new FormData();

                data.append("username", name)
                data.append("password", password)
                data.append("Email", email)
                data.append("Location", address)

                apiFunctions.POST_REQUEST(BASE_URL + API_URL.SIGN_UP, data).then(res => {

                    // alert(res)

                    // alert(JSON.stringify(JSON.parse(res.data)))
                    if (res.data == undefined || res.data == null) {
                        alert("Please enter correct username and password")
                        return false
                    }

                    AsyncStorage.setItem(USER_INFO, JSON.stringify(JSON.parse(res.data))).then(res => {
                    })

                    AsyncStorage.setItem(USER_ID, JSON.stringify(JSON.parse(res.data).Id)).then(res => {
                        navigation.replace('Login')
                    })

                })
            } else {
                alert("Please fill all fields")
            }
        } else {
            alert("Password and confirm password must match")
        }

    }


    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

                <View style={styles.inputContainer}>
                    <TextInput
                        mode="outlined"
                        label="Username"
                        placeholder="Enter username"
                        onChangeText={(input) => setName(input)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Address"
                        placeholder="Enter address"
                        onChangeText={(input) => setAddress(input)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Email"
                        placeholder="Enter email address"
                        onChangeText={(input) => setEmail(input)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Password"
                        secureTextEntry={true}
                        placeholder="Enter password"
                        onChangeText={(input) => setPassword(input)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Confirm Password"
                        secureTextEntry={true}
                        placeholder="Enter confirm password"
                        onChangeText={(input) => setConfirmPassword(input)}
                    />
                    <Button labelStyle={{ color: "white" }} style={styles.logButton} mode="contained" onPress={onRegister}>
                        Register
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}

export default Register;

const styles = StyleSheet.create({
    mainContainer: {
        width: wp("100%"),
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        width: wp("90%"),
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
        marginTop: hp("10%")
    }
});
