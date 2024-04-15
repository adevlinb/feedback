import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import FooterIcon from "../../assets/logos/footerIcon.png";

export default function BottomNav({ navigation }) {
    return (
        <View style={styles.bottomNav}>
            <Pressable onPress={() => navigation.navigate("Grid")}><Text style={styles.footerText} >Grid</Text></Pressable>
            <Pressable onPress={() => navigation.navigate("Messages")}><Text style={styles.footerText} >Messages</Text></Pressable>
            <Pressable onPress={() => navigation.navigate("Albums")}><Text style={styles.footerText} >Albums</Text></Pressable>
            <Pressable onPress={() => navigation.navigate("Feedback")}><Text style={styles.footerText} >Feedback</Text></Pressable>
            <Image source={FooterIcon} />
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