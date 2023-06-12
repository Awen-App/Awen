import React, { useState } from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity,Button} from 'react-native';
import {auth} from '../../fireBaseConfig'
import * as ImagePicker from 'expo-image-picker';
import ADDRESS_IP from '../../env';
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'
function ModifyOrg({route}) {
  let navigation=useNavigation();
    const[image,setImage]=useState("");
    const [buttonColor, setButtonColor] = useState('#000000');;
    const org=route.params.org
    const id=org.orgId
    console.log(id,'this is organization')
    //---------upload image to cloudinary
    const uploadImageToCloudinary = async (imageUri) => {
        const data = new FormData();
        let filename = imageUri.split('/').pop();
        console.log(filename,'my fileee')
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        if (type === 'image/jpg') type = 'image/jpeg';
    if (type === 'image/png') type = 'image/png';
    data.append('file', { uri: imageUri, name: filename, type }); 
    data.append('upload_preset', 'lrkelxtq');
    
    try {
      let response = await axios.post(
        'https://api.cloudinary.com/v1_1/dtbzrpcbh/image/upload',
        data,
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      if (response.data.secure_url !== '') {
        const image = response.data.secure_url;
        console.log(image)
        setImage(image); 
        alert('image uploaded')
      } else {
        Alert.alert("Error", "Image upload failed");
      }
    } catch (err) {
      Alert.alert("Error", "Image upload failed");
      console.log("Upload Image Error", err, err.request, err.response);
    }
    }
   //-------------------select image from galery
    const selectImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        uploadImageToCloudinary(result.assets[0].uri);
      }
    };
    //--------------update image ----------------
    const updateImage = async () => {
        console.log(image);
      
        try {
          await uploadImageToCloudinary(image);
          console.log("Image uploaded successfully");
      
         await axios
            .put(`http://${ADDRESS_IP}:3001/organizations/update/${id}`,{orgImg:image})
            .then((response) => {
              console.log(response, 'response');
              alert("Updated successfully");
            })
            .catch((error) => {
              console.log(error.message);
            });
            navigation.navigate("profile")

        } catch (error) {
          console.log(error.message);
        }
      };

  return (
    <View>
     <Button title="Select Image" onPress={selectImage} color={buttonColor} />
     <TouchableOpacity
           onPress={()=>{
            updateImage()
             }}
           style={styles.appButtonContainer}>
            <Text 
            style={styles.appButtonText}>
              Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
           onPress={()=>{
            auth.signOut
             }}
           style={styles.appButtonContainer}>
            <Text 
            style={styles.appButtonText}>
              Sign out
              </Text>
            </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  
  signin: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  head:{
    flexDirection: 'row',
    height:50,
    marginVertical:40
  },
textInput:{
    width: '70%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius :13,
},
appButtonContainer: {
    width:'70%',
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
})
  
export default ModifyOrg  