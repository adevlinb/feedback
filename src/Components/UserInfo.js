// IMPORTS
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useContext, useEffect } from 'react';
import { User } from '../Context/UserContext';
import * as ImagePicker from "expo-image-picker";

// COMPONENTS
import { ProfilePicBackup } from "./ProfilePicBackup.js"

// APIS

export function UserInfo() {
    const { user } = useContext(User);

    return (
        <View style={styles.userInfoContainer}>
            <View style={styles.picContainer}>
                {user.profilePic === "" ? <ProfilePicBackup /> : <Image source={{ uri: user.profilePic }} style={styles.profilePic} />}
            </View>
            <Text style={styles.userName}>{user?.formattedName}</Text>
        </View>
    )
}

export function UserImagePicker({ image, setImage, hasGalleryPermission, setHasGalleryPermission }) {
    const { user } = useContext(User);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === "granted");
        })();
    }, [])

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if (result?.canceled || result?.cancelled) setImage({ uri: user.profilePic })
        else setImage(result?.assets[0])
    }

    return (
        <View style={styles.userInfoContainer}>
            <Pressable onPress={pickImage} style={{ justifyContent: "center" }}>
                {image.uri === "" ? <ProfilePicBackup /> : <Image source={{uri: image.uri}} style={[styles.profilePic, styles.picContainer]} />}
                <Text style={{color:"blue", alignSelf: "center"}} >{image.uri === "" ? "Upload Your Profile Picture" : "Choose a different photo"}</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    userInfoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    picContainer: {
        borderRadius: "50%",
        overflow: "hidden",
        margin: 10,
        alignSelf: "center",
    },
    profilePic: {
        width: 90,
        height: 90
    },
    userName: {
        textDecorationLine: 'underline',
    },
})