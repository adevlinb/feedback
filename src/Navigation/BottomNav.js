// IMPORTS
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// COMPONENTS


// APIS

export default function BottomNav() {
    const navigation = useNavigation();

    return (
        <View style={styles.bottomNav}>
            <Pressable onPress={() => navigation.navigate("Grid")}><Text style={styles.footerText} >Grid</Text></Pressable>
            <Pressable onPress={() => navigation.navigate("Maps")}><Text style={styles.footerText} >Map</Text></Pressable>
            <Pressable onPress={() => navigation.navigate("Bulletin")}><Text style={styles.footerText} >Bulletin</Text></Pressable>
            <Pressable onPress={() => navigation.navigate("AllChats")}><Text style={styles.footerText} >Messages</Text></Pressable>
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
    }
})