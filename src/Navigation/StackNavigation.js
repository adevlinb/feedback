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
import AboutScreen from '../Screens/AboutScreen';
import TermsOfUseScreen from '../Screens/TermsOfUseScreen';
import PrivacyScreen from '../Screens/PrivacyScreen';
import HelpScreen from '../Screens/HelpScreen';
import NotificationsSetScreen from '../Screens/NotificationsSetScreen';
import GridScreen from "../Screens/GridScreen";
import AllChatsScreen from '../Screens/AllChatsScreen';
import ChatDetailScreen from '../Screens/ChatDetailScreen';
import MapsScreen from "../Screens/MapScreen";
import BulletinScreen from "../Screens/BulletinScreen";
import ProfileDetailScreen from '../Screens/ProfileDetailScreen';


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
                <Drawer.Screen name="Grid" component={GridScreen} options={{ headerShown: false, title: "Grid Screen" }}/>
                <Drawer.Screen name="AllChats" component={AllChatsScreen} options={{ headerShown: false, title: "All Chats" }}/>
                <Drawer.Screen name="Maps" component={MapsScreen} options={{ headerShown: false, title: "Albums Screen" }}/>
                <Drawer.Screen name="Bulletin" component={BulletinScreen} options={{ headerShown: false, title: "Bulletin" }}/>
                <Drawer.Screen name="ProfileDetail" component={ProfileDetailScreen} options={{ headerShown: false, title: "Bulletin" }}/>
                <Drawer.Screen name="ChatDetail" component={ChatDetailScreen} options={{ headerShown: false, title: "Chat Detail" }}/>
            </Drawer.Navigator>}

            {!user && 
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            </Stack.Navigator>}

        </NavigationContainer>
    )
}


