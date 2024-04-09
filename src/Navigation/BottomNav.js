import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import FooterIcon from "../../assets/logos/footerIcon.png";

export default function BottomNav({ navigation }) {
    return (
        <View style={styles.bottomNav}>
            <Pressable onPress={() => navigation.navigate("About")}><Text style={styles.footerText} >About</Text></Pressable>
            <Pressable onPress={() => navigation.navigate("TermsOfUse")}><Text style={styles.footerText} >Terms of Use</Text></Pressable>
            <Pressable onPress={() => navigation.navigate("Privacy")}><Text style={styles.footerText} >Privacy</Text></Pressable>
            <Pressable onPress={() => navigation.navigate("Help")}><Text style={styles.footerText} >Help/FAQ</Text></Pressable>
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