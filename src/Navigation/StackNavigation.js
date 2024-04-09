// IMPORTS
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useContext } from 'react';
import { User } from '../Context/UserContext';
import CustomDrawerItems from './CustomDrawerItems';

// SCREENS
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import ManageProfileScreen from '../Screens/ManageProfileScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import AboutScreen from '../Screens/About';
import TermsOfUseScreen from '../Screens/TermsOfUse';
import PrivacyScreen from '../Screens/Privacy';
import HelpScreen from '../Screens/Help';
import NotificationsSetScreen from '../Screens/NotificationsSetScreen';

// APIS

export default function StackNavigation() {
    const Stack = createNativeStackNavigator();
    const Drawer = createDrawerNavigator();
    const { user, setUser } = useContext(User);

    return (
        <NavigationContainer>

            {user && 
            <Drawer.Navigator initialRouteName="Home" screenOptions={{ drawerStyle: { backgroundColor: "#C6E5E3" }}} drawerContent={(props) => <CustomDrawerItems {...props}/>}>
                <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false, title: "Home" }}/>
                <Drawer.Screen name="ManageProfile" component={ManageProfileScreen} options={{ headerShown: false, title: "Manage Profile" }} />
                <Drawer.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, title: "Settings" }}/>
                <Drawer.Screen name="About" component={AboutScreen} options={{ headerShown: false, title: "About" }}/>
                <Drawer.Screen name="TermsOfUse" component={TermsOfUseScreen} options={{ headerShown: false, title: "Terms of Use" }}/>
                <Drawer.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: false, title: "Privacy" }}/>
                <Drawer.Screen name="Help" component={HelpScreen} options={{ headerShown: false, title: "Help/FAQ" }}/>
                <Drawer.Screen name="NotificationSet" component={NotificationsSetScreen} options={{ headerShown: false, title: "Notification Settings" }}/>
            </Drawer.Navigator>}

            {!user && 
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            </Stack.Navigator>}

        </NavigationContainer>
    )
}


