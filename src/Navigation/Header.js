// IMPORTS
import { StyleSheet, Text, View, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { User } from '../Context/UserContext';

// COMPONENTS

// APIS

export default function Header({ navigation }) {
    const { twiliteMode, setTwiliteMode } = useContext(User);




    return (
        <View style={styles.header}>
            <Ionicons style={styles.iconPlacement} onPress={() => { navigation.toggleDrawer() }} name="menu" size={24} color="black" />
            <Text>Twilite</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={twiliteMode ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setTwiliteMode(!twiliteMode)}
                value={twiliteMode}
                style={styles.logoPlacement}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 15
    },
    iconPlacement: {
        position: "absolute",
        left: 15
    },
    logoPlacement: {
        position: "absolute",
        right: 15
    }
})