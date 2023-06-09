import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput,TouchableOpacity ,Image,Button} from 'react-native'
import {auth} from '../../fireBaseConfig'
import * as ImagePicker from 'expo-image-picker';
import ADDRESS_IP from '../../env';
import axios from 'axios'
function Addcause() {
  const [buttonColor, setButtonColor] = useState('#000000');
  const[image,setImage]=useState("")
  const[title,setTitle]=useState("")
  const[des,setDes]=useState("")
  const[cat,setCat]=useState("")
  const[target,setTarget]=useState("")

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
    setImage(image); 
  } else {
    Alert.alert("Error", "Image upload failed");
  }
} catch (err) {
  Alert.alert("Error", "Image upload failed");
  console.log("Upload Image Error", err, err.request, err.response);
}
}
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

  
  const cause={
    causeImg: image,
    title:title,
    causeDescription:des,
    causeCategory:cat,
    // createdAt: new Date(),
    target:Number(target),
    current: 0,
    accepted: true,
    status: true,
    orgId:auth.currentUser.uid} 
  
  const createCause = () => {
    console.log(cause)
    axios
      .post(`http://${ADDRESS_IP}:3001/postcauses`,cause)
      .then(response => {
        console.log(response)
        alert("added succefully");
      })
      .catch(error => 
        console.log(error.mesage));
  };
  return (
    <View style={styles.signin}>
           <Image
            style={{ width: 80, height: 80 ,margin:50}}
            source={require('../../assets/awenLogo.png')}
          />
           <Text style={styles.wlc}>Add a cause </Text>
           <Button title="Select Image" onPress={selectImage} color={buttonColor} />

        <TextInput
        style={styles.textInput}
        placeholder="title.."
        onChangeText={title=>setTitle(title)}
      />
        <TextInput
        style={styles.textInput}
        placeholder="descreption..."
        onChangeText={des=>setDes(des)}
      />
         <TextInput
        style={styles.textInput}
        placeholder="target..."
        onChangeText={tar=>setTarget(tar)}
      />
       <TextInput
        style={styles.textInput}
        placeholder="category..."
        onChangeText={cat=>setCat(cat)}
      />
          <TouchableOpacity
           onPress={()=>{
            createCause()
             }}
           style={styles.appButtonContainer}>
            <Text 
            style={styles.appButtonText}>
              Add
              </Text>
            </TouchableOpacity>
          {/* <Button
        title="signIn With google"
        onPress={() => signInWthGoogle()}
      /> */}
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
  appButtonContainer1: {
    width:'50%',
    height:50,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight:10

  },
  org:{

    width:'45%',
    backgroundColor: '#009688',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight:5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  appButtonText1: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  wlc:{
    // color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  }

})

export default Addcause