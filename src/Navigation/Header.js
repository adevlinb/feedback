import { StyleSheet, Text, View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import smallLogo from "../../assets/logos/smallLogo.png";

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
        <Ionicons style={styles.iconPlacement} onPress={() => {navigation.toggleDrawer()}} name="menu" size={24} color="black" />
        <Text>Feedback</Text>
        <Image style={styles.logoPlacement} source={smallLogo} />
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