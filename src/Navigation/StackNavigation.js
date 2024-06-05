// IMPORTS
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { User } from '../Context/UserContext';
import CustomDrawerItems from './CustomDrawerItems';

// SCREENS
import LoginScreen from '../Screens/LoginScreen';
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


// NAVIGATION CONTAINERS
const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const GridTabStack = createNativeStackNavigator();
const MapTabStack = createNativeStackNavigator();
const BulletinTabStack = createNativeStackNavigator();
const MsgsTabStack = createNativeStackNavigator();

export default function StackNavigation() {
    const { user } = useContext(User);

    return (
        <NavigationContainer>
            {user ? <AppNav /> : <AuthNav />}
        </NavigationContainer>
    )
}


function AuthNav() {
    return (
        <AuthStack.Navigator initialRouteName="Login" >
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ StackBarLabel: 'Login/SignUp' }} />
        </AuthStack.Navigator>
    )
}


function AppNav() {
    return (
        <Drawer.Navigator initialRouteName="Grid" screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: "#C6E5E3" }}} drawerContent={(props) => <CustomDrawerItems {...props}/>}>
            <Drawer.Screen name="ManageProfile" component={ManageProfileScreen} options={{ title: "Manage Profile" }} />
            <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }}/>
            <Drawer.Screen name="About" component={AboutScreen} options={{ title: "About" }}/>
            <Drawer.Screen name="TermsOfUse" component={TermsOfUseScreen} options={{ title: "Terms of Use" }}/>
            <Drawer.Screen name="Privacy" component={PrivacyScreen} options={{ title: "Privacy" }}/>
            <Drawer.Screen name="Help" component={HelpScreen} options={{ title: "Help/FAQ" }}/>
            <Drawer.Screen name="NotificationSet" component={NotificationsSetScreen} options={{ title: "Notification Settings" }}/>
            <Drawer.Screen name="Grid" component={GridStack} options={{ title: "Grid" }}/>
            <Drawer.Screen name="AllChats" component={AllChatsStack} options={{ title: "All Chats" }}/>
            <Drawer.Screen name="Maps" component={MapStack} options={{ title: "Map Screen" }}/>
            <Drawer.Screen name="Bulletin" component={BulletinStack} options={{ title: "Bulletin" }}/>
        </Drawer.Navigator>
    )
}

function GridStack() {
    return (
        <GridTabStack.Navigator initialRouteName="GridScreen" screenOptions={{ headerShown: false }}>
            <GridTabStack.Screen name="GridScreen" component={GridScreen} />
            <GridTabStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
            <GridTabStack.Screen name="ChatDetail" component={ChatDetailScreen} />
        </GridTabStack.Navigator>
    )
}

function MapStack() {
    return (
        <MapTabStack.Navigator initialRouteName="MapScreen" screenOptions={{ headerShown: false }}>
            <MapTabStack.Screen name="MapScreen" component={MapsScreen} />
            <MapTabStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
            <MapTabStack.Screen name="ChatDetail" component={ChatDetailScreen} />
        </MapTabStack.Navigator>
    )
}

function BulletinStack() {
    return (
        <BulletinTabStack.Navigator initialRouteName="BulletinScreen" screenOptions={{ headerShown: false }}>
            <BulletinTabStack.Screen name="BulletinScreen" component={BulletinScreen} />
            <BulletinTabStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
            <BulletinTabStack.Screen name="ChatDetail" component={ChatDetailScreen} />
        </BulletinTabStack.Navigator>
    )
}

function AllChatsStack() {
    return (
        <MsgsTabStack.Navigator initialRouteName="AllChatsScreen" screenOptions={{ headerShown: false }}>
            <MsgsTabStack.Screen name="AllChatsScreen" component={AllChatsScreen} />
            <MsgsTabStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
            <MsgsTabStack.Screen name="ChatDetail" component={ChatDetailScreen} />
        </MsgsTabStack.Navigator>
    )
}



