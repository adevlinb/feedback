// IMPORTS
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

// COMPONENTS

// APIS

export function ProfilePicBackup() {
    return (
        <View style={styles.iconsContainer}>
            <View style={styles.iconBorder}><Ionicons name="person" size={60} color="black" /></View>
        </View>
    )
}

export function addProfilePic() {
    return (
        <View style={styles.iconsContainer}>
            <Ionicons style={styles.addSign} name="ios-add-circle" size={27} color="blue" />
            <View style={styles.iconBorder}><Ionicons name="person" size={60} color="black" /></View>
            <View style={styles.iconBackground}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconsContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
    iconBorder: {
        borderColor: "black",
        borderWidth: 2,
        borderRadius: "50%",
        overflow: "hidden",
    },
    iconBackground: {
        position: "absolute",
        bottom: 5,
        right: 50,
        zIndex: 0,
        height: 15,
        width: 15,
        backgroundColor: "white",
    },
})