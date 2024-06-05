// IMPORTS
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { useContext } from 'react';
import { User } from '../Context/UserContext';
import { UserInfo } from '../Components/UserInfo';

// COMPONENTS
import Header from '../Navigation/Header';
import BottomNav from '../Navigation/BottomNav';
import SettingsNav from '../Navigation/SettingsNav';

// APIS

export default function SettingsScreen() {
	const { user } = useContext(User);

	return (
        <SafeAreaView style={styles.mainContainer}>
            <Header />
			<UserInfo />
			<View style={styles.settingsContainer}>
				<Text style={styles.labelText}>Settings:</Text>
				<SettingsNav />
			</View>
            <BottomNav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
		padding: 15,
    },
	settingsContainer: {
		padding: 15
	},
	labelText: {
		fontWeight: "bold",
		fontSize: 20,
	},
})