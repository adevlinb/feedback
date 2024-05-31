// IMPORTS
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'

// COMPONENTS
import Header from '../Navigation/Header'
import BottomNav from '../Navigation/BottomNav'

// APIS

export default function AboutScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header navigation={navigation} />
            <View style={styles.statsContainer}>
                <View style={styles.stats}>
                    <Text>About Screen</Text>
                </View>
            </View>
            <View >
                <Text>Feedback is meant to be the gay men's app that finally functions properly and doesn't overcharge for our services.</Text>
                <Text>We will continuously work to maintain our MVP (minimal viable product) and add new features over time.</Text>
                <Text>That being said: please leave us feedback with items we can add, adjust, fix, or be better about so we can continue to improve.</Text>
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