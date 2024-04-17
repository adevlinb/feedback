// IMPORTS
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useContext } from 'react';
import { User } from '../Context/UserContext';

// COMPONENTS
import { UserInfo } from '../Components/UserInfo';

// APIS
import * as usersService from "../utilities/users-service";
import * as socket from "../utilities/socket";

export default function CustomDrawerItems(props) {
    const { user, setUser } = useContext(User);


    function logout() {
        usersService.logOut();
        setUser(null);
        socket.userLogout();
    }

    return (
        <DrawerContentScrollView style={styles.mainContainer} contentContainerStyle={styles.contentMainContainer} {...props}>
            <UserInfo />
            <DrawerItem label="Home" labelStyle={styles.itemLabels} style={styles.itemStyle} onPress={() => props.navigation.navigate("Home")}/>
            <DrawerItem label="About" labelStyle={styles.itemLabels} style={styles.itemStyle} onPress={() => props.navigation.navigate("About")}/>
            <DrawerItem label="Settings" labelStyle={styles.itemLabels} style={styles.itemStyle} onPress={() => props.navigation.navigate("Settings")}/>
            <DrawerItem label="TermsOfUse" labelStyle={styles.itemLabels} style={styles.itemStyle} onPress={() => props.navigation.navigate("TermsOfUse")}/>
            <DrawerItem label="Privacy" labelStyle={styles.itemLabels} style={styles.itemStyle} onPress={() => props.navigation.navigate("Privacy")}/>
            <DrawerItem label="Help" labelStyle={styles.itemLabels} style={styles.itemStyle} onPress={() => props.navigation.navigate("Help")}/>
            <DrawerItem label="ManageProfile" labelStyle={styles.itemLabels} style={styles.itemStyle} onPress={() => props.navigation.navigate("ManageProfile")}/>
            <View style={styles.bottomContainer}>
                <Pressable onPress={logout} style={styles.logoutButton}><Text style={styles.logoutButtonText}>Logout</Text></Pressable>
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    contentMainContainer: {
        flexGrow: 1
    },
    itemLabels: {
        fontWeight: 700, 
        color: "black"
    },
    itemStyle: {
        marginTop: 0, 
        marginBottom: 0,
    },
    bottomContainer: {
        justifyContent: "space-evenly",
        flexGrow: 1,
        paddingLeft: 15
    },
    logoutButton: {
        width: "50%",
        borderRadius: 7.5,
        alignItems: "center",
        backgroundColor: "rgb(24,46,42)",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    logoutButtonText: {
        color: "white",
        fontWeight: "600",
    },
    changeAccountContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})