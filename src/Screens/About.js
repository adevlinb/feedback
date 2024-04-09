// IMPORTS
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

// COMPONENTS
import Header from '../Components/Header'
import BottomNav from '../Navigation/BottomNav'

// APIS

export default function About({ navigation }) {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header navigation={navigation} />
            <View style={styles.statsContainer}>
                <View style={styles.stats}>
                    <Text>Stats</Text>
                </View>
                <View style={styles.refresh}>
                    <Text>About Screen</Text>
                </View>
            </View>
            <BottomNav navigation={navigation}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1
    },
    mainView: {
        padding: 5,
        height: "100%",
        alignItems: "center",
        paddingTop: 50
    },
    statsContainer: {
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        borderRadius: 5
    },
    stats: {
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: 10,
        zIndex: 5,
        height: 60,
    },
    refresh: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: 10,
        height: 60,
        backgroundColor: "#9DBAB9",
        zIndex: 3,
        position: "absolute",
        top: 50
    },

})