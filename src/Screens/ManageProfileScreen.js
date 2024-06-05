// IMPORTS
import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, ScrollView } from 'react-native'
import { useContext, useState } from 'react';
import { User } from '../Context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

// COMPONENTS
import Header from '../Navigation/Header'
import BottomNav from '../Navigation/BottomNav'
import { UserInfo, UserImagePicker } from '../Components/UserInfo';

// APIS
import * as usersAPI from "../utilities/users-api";
import * as usersService from "../utilities/users-service";
import { formatPhoneNumber } from '../utilities/constants';


export default function ManageProfileScreen() {
	const { user, setUser, userDonations } = useContext(User);
	const [image, setImage] = useState({ uri: user.profilePic });
    const [formData, setFormData] = useState(user);
	const [editFirstName, setEditFirstName] = useState(false);
	const [editLastName, setEditLastName] = useState(false);
	const [editPhoneNumber, setEditPhoneNumber] = useState(false);
	const [hasGalleryPermission, setHasGalleryPermission] = useState(false);

	function handleChange(text, input) {
        if (input === "phoneNumber") {
            textNums = text.replace(/[^0-9\\.]+/g, '');
            setFormData({ ...formData, [input]: textNums });
        }

        else return setFormData({ ...formData, [input]: text });
    }

	function checkChanges() {
		if (parseInt(formData.phoneNumber) === parseInt(user.phoneNumber) && 
			parseInt(formData.donationGoal) === parseInt(user.donationGoal) &&
			image.uri === user.profilePic &&
			formData.firstName === user.firstName &&
			formData.lastName === user.lastName
			)
			return true
			
		else return false
		
	}

	async function submitProfileUpdates() {
        let photoURL = null;

        if (image.uri !== user.profilePic) {
            const imageData = new FormData();
            imageData.append('photo', {
                name: image.fileName,
                type: image.type,
                photo: image.uri,
                uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
            });
            // UPLOAD PHOTO
            photoURL = await usersAPI.uploadProfilePhoto(imageData)
			formData.profilePic = photoURL.url
        }
        
        // UPDATE PROFILE
        if (parseInt(formData.phoneNumber) !== parseInt(user.phoneNumber)) formData.phoneNumber = parseInt(formData.phoneNumber)
        if (parseInt(formData.donationGoal) !== parseInt(user.gonationGoal)) formData.donationGoal = parseInt(formData.donationGoal)
		const updatedUser = usersService.updateUser(formData);
        setUser(updatedUser);
		setFormData(updatedUser)
		return checkChanges();
    }

	return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <Header />
			<ScrollView contentContainerStyle={styles.mainContainer}>
				<UserImagePicker image={image} setImage={setImage} hasGalleryPermission={hasGalleryPermission} setHasGalleryPermission={setHasGalleryPermission}/>
				<View style={styles.statsContainer}>
					<View style={{ flexDirection: "row", alignItems: "center"}}>
						<MaterialIcons name="verified-user" size={24} color="#C13584" />
						<Text style={{ marginLeft: 10 }}>Verified?</Text>
					</View>
				</View>
				<View style={styles.mainInputContainer}>
					<View style={styles.nextLayerContainer}>
						<View style={editFirstName ? styles.inputContainerActive : styles.inputContainer}>
							<Text style={styles.placeholderText}>First Name</Text>
							{editFirstName ? <TextInput value={formData.firstName} onChangeText={(text) => handleChange(text, "firstName")}></TextInput> : <Text>{formData.firstName}</Text>}
						</View>
						<Pressable onPress={() => setEditFirstName(!editFirstName)}><Text style={editFirstName ? styles.cancel : styles.edit }>{editFirstName ? "cancel" : "edit"}</Text></Pressable>
					</View>
					<View style={styles.nextLayerContainer}>
						<View style={editLastName ? styles.inputContainerActive : styles.inputContainer}>
							<Text style={styles.placeholderText}>Last Name</Text>
							{editLastName ? <TextInput value={formData.lastName} onChangeText={(text) => handleChange(text, "lastName")}></TextInput> : <Text>{formData.lastName}</Text>}
						</View>
						<Pressable onPress={() => setEditLastName(!editLastName)}><Text style={editLastName ? styles.cancel : styles.edit }>{editLastName ? "cancel" : "edit"}</Text></Pressable>
					</View>	

				</View>
				<View style={styles.submitContainer}>
					<Pressable disabled={checkChanges()} style={checkChanges() ? styles.submitButtonDisabled : styles.submitButton} onPress={submitProfileUpdates}><Text style={{color: "white"}}>Save Changes</Text></Pressable>
				</View>
			</ScrollView>
            <BottomNav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
		flexGrow: 1,
        padding: 30,
		paddingBottom: "15%",
		justifyContent: "space-between"
    },
	statsContainer: {
		marginVertical: 20,
		gap: 10,
		width: "100%",
		justifyContent: "space-between",
	},
	mainInputContainer: {
		justifyContent: "space-evenly",
	},
	nextLayerContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	inputContainer: {
		height: 40,
		justifyContent: "center",
	},
	inputContainerActive: {
		width: "50%",
		height: 40,
		justifyContent: "center",
		borderStyle: "solid",
        borderWidth: 1,
		borderColor: "red",
	},
	placeholderText: {
		color: "#B0B0B0",
		fontSize: 10
	},
	submitContainer: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	submitButton: {
		padding: 10,
        borderRadius: 7.5,
        width: "50%",
        alignItems: "center",
        backgroundColor: "rgb(24,46,42)",
	},
	submitButtonDisabled: {
		padding: 10,
        borderRadius: 7.5,
        width: "50%",
        alignItems: "center",
        backgroundColor: "rgba(24,46,42, 0.5)",
	},
	edit: {
		color: "#007AFF", 
		textDecorationLine: 'underline',
	},
	cancel: {
		color: "red", 
		textDecorationLine: 'underline',
	}
})