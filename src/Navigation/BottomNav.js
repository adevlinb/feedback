// IMPORTS
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons, Feather, Foundation } from '@expo/vector-icons';

// COMPONENTS


// APIS

export default function BottomNav() {
    const navigation = useNavigation();

    return (
        <View style={styles.bottomNav}>
            <Pressable style={styles.pressContainer} onPress={() => navigation.navigate("Grid")}><Feather name="grid" size={24} color="white" /><Text style={styles.labelText} >GRID</Text></Pressable>
            <Pressable style={styles.pressContainer} onPress={() => navigation.navigate("Maps")}><Feather name="map" size={24} color="white" /><Text style={styles.labelText} >MAP</Text></Pressable>
            <Pressable style={styles.pressContainer} onPress={() => navigation.navigate("Bulletin")}><Foundation name="list-bullet" size={24} color="white" /><Text style={styles.labelText} >BULLETIN</Text></Pressable>
            <Pressable style={styles.pressContainer} onPress={() => navigation.navigate("AllChats")}><AntDesign name="message1" size={24} color="white" /><Text style={styles.labelText} >MSGS</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNav: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#1F3C37",
    },
    footerText: {
        color: "white",
        fontWeight: 500
    },
    labelText: {
        color: "white",
        fontWeight: 500,
        fontSize: 10,
        margin: 5,
    },
    pressContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
})