// IMPORTS
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { User } from '../Context/UserContext';

// COMPONENTS

// APIS
import * as usersService from "../utilities/users-service";

export default function LoginScreen() {
    const { user, setUser } = useContext(User);

    const login = {
        email: "",
        password: ""
    }

    const signUp = {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    }

    const [loginChoice, setLoginChoice] = useState("")
    const [loginData, setLoginData] = useState(login);
    const [signUpData, setSignUpData] = useState(signUp);

    function resetLoginChoice() {
        setLoginChoice("")
        setLoginData(login);
        setSignUpData(signUp);
    }

    async function handleLogin() {
        const user = await usersService.login(loginData);
        setUser(user);
        setLoginData(login);
    }

    function handleLoginChange(text, input) {
        setLoginData({ ...loginData, [input]: text });
    }

    async function handleSignUp() {
        const data = await usersService.signUp(signUpData);
        setSignUpData(signUp);
        setUser(usersService.getUser());
    }

    function handleSignUpChange(text, input) {
        setSignUpData({ ...signUpData, [input]: text });
    }

    function checkCredentials() {
        if (signUpData.email.length > 0) return true
        return false
    }


    return (
        <SafeAreaView>
            <View style={styles.mainView}>
                {loginChoice !== "" ? <Pressable onPress={resetLoginChoice} style={styles.cancelButton}><Ionicons name="close-circle" size={24} color="black" /></Pressable> : ""}
                <Text>FEEDBACK</Text>

                <View style={styles.mainInputContainer}>
                    {loginChoice !== "login" && loginChoice !== "signup" ?
                        <>
                            <Pressable style={styles.registerButton} onPress={() => setLoginChoice("login")}>
                                <Text style={{ color: "white" }}>Login</Text>
                            </Pressable>
                            <Pressable style={styles.registerButton} onPress={() => setLoginChoice("signup")}>
                                <Text style={{ color: "white" }}>Sign Up</Text>
                            </Pressable>
                        </>
                        :
                        <>
                            {loginChoice === "login" &&
                                <View style={styles.inputContainer}>
                                    <View style={styles.textInputContainer}>
                                        <TextInput value={loginData.email} onChangeText={(text) => handleLoginChange(text, "email")} style={styles.registerInputs} placeholder='email' autoCapitalize="none"></TextInput>
                                        <TextInput value={loginData.password} onChangeText={(text) => handleLoginChange(text, "password")} style={styles.registerInputs} placeholder='password' secureTextEntry autoCapitalize="none"></TextInput>
                                    </View>
                                    <Pressable style={styles.registerButton} onPress={handleLogin}>
                                        <Text style={{ color: "white" }}>Login</Text>
                                    </Pressable>
                                </View>
                            }
                            {loginChoice === "signup" &&
                                <View style={styles.inputContainer}>
                                    <View style={styles.textInputContainer}>
                                        <TextInput value={signUpData.email} onChangeText={(text) => handleSignUpChange(text, "email")} style={styles.registerInputs} placeholder='email' autoCapitalize="none"></TextInput>
                                        <TextInput value={signUpData.firstName} onChangeText={(text) => handleSignUpChange(text, "firstName")} style={styles.registerInputs} placeholder='First Name' autoCapitalize="none"></TextInput>
                                        <TextInput value={signUpData.lastName} onChangeText={(text) => handleSignUpChange(text, "lastName")} style={styles.registerInputs} placeholder='Last Name' autoCapitalize="none"></TextInput>
                                        <TextInput value={signUpData.password} onChangeText={(text) => handleSignUpChange(text, "password")} style={styles.registerInputs} placeholder='password' secureTextEntry autoCapitalize="none"></TextInput>
                                    </View>
                                    <Pressable disabled={!checkCredentials()} style={checkCredentials() ? styles.registerButton : styles.registerButtonDisabled} onPress={handleSignUp}>
                                        <Text style={{ color: "white" }}>SignUp</Text>
                                    </Pressable>
                                </View>
                            }
                        </>
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        padding: 5,
        height: "100%",
        alignItems: "center",
        paddingTop: 50
    },
    cancelButton: {
        position: "absolute",
        right: 40,
        top: 30
    },
    mainInputContainer: {
        width: "100%",
        margin: 20,
        paddingHorizontal: 40,
        alignItems: "center",
        gap: 10
    },
    textInputContainer: {
        gap: 15
    },
    inputContainer: {
        width: "100%",
        alignItems: 'stretch',
        gap: 15,
    },
    registerButton: {
        padding: 20,
        borderRadius: 7.5,
        width: "100%",
        alignItems: "center",
        backgroundColor: "rgb(24,46,42)",
    },
    registerButtonDisabled: {
        padding: 20,
        borderRadius: 7.5,
        width: "100%",
        alignItems: "center",
        backgroundColor: "rgba(24,46,42, 0.2)",
    },
    registerInputs: {
        width: "100%",
        height: 45,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 7.5,
        padding: 10,
    }
})