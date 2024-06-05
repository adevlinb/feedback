// IMPORTS
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { User } from '../Context/UserContext';
// import { useNavigationState } from '@react-navigation/native';

// COMPONENTS
import Header from '../Navigation/Header';
import BottomNav from '../Navigation/BottomNav';

// APIS

export default function ChatDetailScreen({ navigation }) {
    const { user, messages } = useContext(User);

    function checkNavStack() {
        console.log(navigation.getState(), "blah blah")
        // console.log(route.name)
        // console.log(nav)
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header />
            <View style={styles.statsContainer}>
                <View style={styles.stats}>
                    <Text>Chat Detail Screen</Text>
                </View>
                <ScrollView>
                    {messages.map(msg => {
                        return (
                            <View key={msg}>
                                <Text>{msg}</Text>
                                <Pressable onPress={checkNavStack}><Text>Press here</Text></Pressable>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <BottomNav />
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