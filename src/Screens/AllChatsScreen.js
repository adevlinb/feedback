// IMPORTS
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useContext } from 'react';
import { User } from '../Context/UserContext';

// COMPONENTS
import Header from '../Navigation/Header';
import BottomNav from '../Navigation/BottomNav';

// APIS
import * as ChatAPI from "../utilities/chat-api";

export default function AllChatsScreen({ navigation }) {
    const { user, myChats, setSelectedChat } = useContext(User);

    console.log("all chat screen: ", myChats)
    console.log("testing all chats")

    async function goToChat(chatId) {
        console.log("go to chat", navigation.getState())
        setSelectedChat(chatId)
        // const chatMessages = await ChatAPI.getMessages(chatId);
        // setMessages(chatMessages)
        navigation.navigate("ChatDetail");
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header />
            <View style={styles.statsContainer}>
                <View style={styles.stats}>
                    <Text>All Chats Screen</Text>
                </View>
                <ScrollView>
                    {myChats.map(chat => {
                        return (
                            <Pressable key={chat} onPress={() => {goToChat(chat)}}>
                                <Text>{chat}</Text>
                            </Pressable>
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
    body: {
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