// IMPORTS
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { useContext } from 'react';
import { User } from '../Context/UserContext';

// COMPONENTS
import Header from '../Navigation/Header';
import BottomNav from '../Navigation/BottomNav';
import SettingsNav from '../Navigation/SettingsNav';
import { UserInfo } from '../Components/UserInfo';

// APIS

export default function SettingsScreen({ navigation }) {
	const { user } = useContext(User);

	return (
        <SafeAreaView style={styles.mainContainer}>
            <Header navigation={navigation} />
			<UserInfo />
			<View style={styles.settingsContainer}>
				<Text style={styles.labelText}>Settings:</Text>
				<SettingsNav navigation={navigation}/>
			</View>
            <BottomNav navigation={navigation}/>
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