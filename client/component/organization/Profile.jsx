import React, { useState ,useEffect,useContext} from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity,ImageBackground,TextInput } from 'react-native';
import { Provider as PaperProvider, Button, Dialog, Portal } from 'react-native-paper'; // Import the Provider component from react-native-paper
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../fireBaseConfig';
import ADDRESS_IP from '../../env';
import { TrakkerContext } from '../Context';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen';
import Icon from 'react-native-vector-icons/Feather';
import * as EmailComposer from 'expo-mail-composer';
import useFetch from '../../useFetch';
const App = (props) => {
  const orgid = auth.currentUser.uid;
  const [trakker, setTrakker] = useContext(TrakkerContext);
  const [show, setShow] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [organization, setOrg] = useState("");
  const {data : organization,error,isLoading}=useFetch(`http://${ADDRESS_IP}:3001/organizations/id/${orgid}`,[trakker])
  console.log(organization)
  
    // setIsLoading(fal<se)
  
  let navigation = useNavigation();
  const[image,setImage]=useState("");
  const [visible, setVisible] = useState(false);

  
  const [subject,setSubject]=useState("");
  const [body,setBody]=useState("");
  const [evisible, seteVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const sendEmail = () => {
    let  options = {
      subject:subject,
      recipients: ["amroualwane1@gmail.com"],
      body: body
    }
    EmailComposer.composeAsync(options)
  };
  // const getProfile = () => {
  //   axios.get(`http://${ADDRESS_IP}:3001/organizations/id/${orgid}`)
  //     .then(res => {
  //       setOrg(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch(error => console.log(error));
  // }
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
    console.log('image uploaded')
  } else {
    console.log("Error", "Image upload failed");
  }
} catch (err) {
  console.log("Error", "Image upload failed");
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
  if(result){
    updateImage()
  }
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
        .put(`http://${ADDRESS_IP}:3001/organizations/update/${orgid}`,{orgImg:image})
        .then((response) => {
          console.log(response, 'response');
          console.log("Updated successfully");
          hideDialog()
        })
        .catch((error) => {
          console.log(error.message);
        });
        setTrakker(!trakker)
        

    } catch (error) {
      console.log(error.message);
    }
  };
  // useEffect(() => {
  //   getProfile();
   
  // }, [trakker]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  const hideeDialog = () => seteVisible(false);

  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.container}>
       
      <View style={styles.emailCont}   onMouseEnter={() => setHovering(true)}
  onMouseLeave={() => setHovering(false)}>
      <Text style={styles.infoValue} visible={!hovering} >Contact us</Text>
      <Icon name="send" style={styles.emailIcon} onPress={() => navigation.navigate("SendEmail")}/></View>
      <View style={styles.avatarContainer}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Actions>
              <Button onPress={selectImage}>Upload New Image</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={evisible} onDismiss={hideeDialog}>
            <Dialog.Actions>
            <TextInput
        placeholder="subject"
        onChangeText={(e) => setSubject(e)}
      />
           <TextInput
        placeholder="body..."
        onChangeText={(e) => setBody(e)}
      />
       <TouchableOpacity
        onPress={() => {
          sendEmail()
        }}
        style={styles.appButtonContainer}
      >
          <Text style={styles.appButtonText}>Send email</Text>
      </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <ImageBackground
          source={{ uri: organization.orgImg }}
          style={styles.avatar}
        ></ImageBackground>
         <ImageBackground
         source={require('../../assets/vecteezy_white-circle-frame-with-shadow_12011581_486.png')}
          style={styles.iconBG}
        ></ImageBackground>
        <TouchableOpacity style={styles.icon} onPress={() => setVisible(true)}>
          <Icon name="camera" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.name}>{organization.orgName}</Text>
      </View>
      
        
        <View style={styles.infoContainer}>
        <Icon name="mail" style={styles.infoIcon}/>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>{organization.orgEmail}</Text>
        </View>
        <View style = {styles.lineStyle} />
       
      <View style={styles.infoContainer}>
        <Icon name="layers" style={styles.infoIcon}/>
        <Text style={styles.infoLabel}>Category:</Text>
        <Text style={styles.infoValue}>{organization.category}</Text>
      </View>
      <View style = {styles.lineStyle} />
      
      <View style={styles.infoContainer}>
        <Icon name="dollar-sign" style={styles.infoIcon}/>
        <Text style={styles.infoLabel}>RIB:</Text>
        <Text style={styles.infoValue}>{organization.rip}</Text>
      </View>
      <View style = {styles.lineStyle} />
      
      <View style={styles.infoContainer} >
        <Icon name="book-open" style={styles.infoIcon}/>
        <Text style={styles.infoLabel} onPress={()=>setShow(!show)}>Description:</Text>
        
        
      </View>
      {show ? <View><Text style={styles.infoValue}>{organization.description}</Text></View> : <View></View>}
      <View style = {styles.lineStyle} />
      <View >
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 75,
    overflow: 'hidden', 
  },
  icon: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    fontSize: 30,
    color: '#2a2a2a',
    zIndex: 1,
  },
  avatar: {
    flexDirection: 'row',
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0, 
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row', 

  },
  infoLabel: {
    // marginTop: 35,
    fontWeight: 'bold',
    fontSize: 18,
    opacity: 0.6,
    alignSelf: 'center',
    paddingRight: 10, 
  },
  infoValue: {
    marginTop: 5,
    fontSize: 15,
    alignSelf: 'center',
    flexDirection: 'row', 
    fontWeight: 500,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  appButtonContainer: {
    fontSize: 20,
    marginRight: 15,
   color: '#ada6a6',
    left: 150,
  },
  appButtonText: {
    fontSize: 17,
    color: '#ada6a6',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  iconBG:{
    position: 'absolute',
    width: 36,
    height: 36,
    bottom: 55,
    left: 97.5,
    opacity: 0.5,
  },
  infoIcon: {
    marginTop: 5,
    fontSize: 20,
    alignSelf: 'center',
    flexDirection: 'row', 
    marginRight:15
  },
  lineStyle:{
    width:215,
    borderWidth: 0.5,
    borderColor:'#ada6a6',
    margin:10,
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
emailIcon: {
  fontSize: 22,
  flexDirection: 'row', 
  
},
emailCont: {
  alignSelf: 'flex-end',
  flexDirection: 'row', 
  
},
});


const Profile = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};

export default Profile;
