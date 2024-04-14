import * as Location from 'expo-location';

export async function geolocationSetup() {
    const updatedLocation = {};
    
    console.log("geolocation setup function");
    // https://developer.apple.com/documentation/corelocation/configuring_your_app_to_use_location_services
//     Verify that the location services you want to use are available.

// Verify your app has permission to access location data.

    // 1. Check permissions.. have they been granted already?
    //      a. is it a while using app? Or indefinitely / in the background??
    //      b. how to check permissions in ios settings
    // 2. if location services does not === "while using app" || "anytime".. cannot use application
    // 2. Get updated location
    // 3. return latest info.. 

  

        let { status } = await Location.requestForegroundPermissionsAsync();

        console.log(status, "geostatus")
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});

        console.log(location, "location in geoSetup")


    return updatedLocation;
}