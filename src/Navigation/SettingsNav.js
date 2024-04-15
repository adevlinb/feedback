// IMPORTS
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

// COMPONENTS

// APIS

export default function SettingsNav({ navigation }) {
    return (
        <View style={styles.routesContainer}>
            <Pressable onPress={() => navigation.navigate("NotificationSet")} style={styles.linkContainer}>
                <View style={styles.iconTextContainer}>
                    <Ionicons name="notifications-outline" size={24} color="#C13584" />
                    <Text style={styles.footerText}>Notifications</Text>
                </View>
                <AntDesign style={styles.carotStyle} name="right" size={15} color="black" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    routesContainer: {
    },
    linkContainer: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: 10
    },
    iconTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    footerText: {
        alignItems: "center",
        fontWeight: 700,
    },
    carotStyle: {
        paddingTop: 6, 
        textShadowColor: "black", 
        textShadowOffset: { width: 0.5, height: 0.5}, 
        textShadowRadius: 1 ,
    },
})


