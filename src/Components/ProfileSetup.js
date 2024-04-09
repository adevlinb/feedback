// IMPORTS
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import smallLogo from "../../assets/logos/smallLogo.png";


// COMPONENTS
// import ProfilePicBackup from '../ProfilePicBackup';
import { UserImagePicker } from './UserInfo';

// APIS
import { formatPhoneNumber } from '../utilities/constants';


export default function ProfileSetup({ user, nextPage, profileUpdate, setProfileUpdate, hasGalleryPermission, setHasGalleryPermission, image, setImage }) {

    function handleChange(text, input) {
        if (input === "phoneNumber") {
            textNums = text.replace(/[^0-9\\.]+/g, '');
            setProfileUpdate({ ...profileUpdate, [input]: textNums });
        }
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Donations.com</Text>
                <View style={styles.logo}><Image source={smallLogo} /></View>
            </View>
            <View style={styles.middleContainer}>
                <View style={{alignItems: "center"}}>
                    <Text style={{ fontSize: 35, fontWeight: "bold" }}>Welcome, {user?.formattedName}!</Text>
                    <Text style={{ fontSize: 20 }}>Let's setup your profile.</Text>
                </View>
                <UserImagePicker image={image} setImage={setImage} />
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Phone Number:</Text>
                    <TextInput maxLength={14} value={() => formatPhoneNumber(profileUpdate.phoneNumber)} style={styles.textInputs} placeholder='(000) 000-0000' keyboardType="numeric" onChangeText={(text) => handleChange(text, "phoneNumber")}></TextInput>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable style={styles.nextButton} onPress={nextPage}>
                    <Text style={{ color: "white" }}>Next</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        padding: 15,
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
    },
    middleContainer: {
        width: "100%",
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: 10,
        gap: 25,
    },
    bottomContainer: {
        width: "100%",
        alignItems: "center",
    },
    header: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        position: "absolute",
        right: 0
    },
    nextButton: {
        padding: 10,
        borderRadius: 7.5,
        width: "50%",
        alignItems: "center",
        backgroundColor: "rgb(24,46,42)",
    },
    addSign: {
        position: "absolute",
        bottom: 0,
        right: 45,
        zIndex: 1,
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 10,
    },
    textInputs: {
        width: "100%",
        alignSelf: "stretch",
        height: 30,
        borderStyle: "solid",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 7.5,
        paddingHorizontal: 5,
    }

})