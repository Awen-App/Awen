import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {auth} from '../../fireBaseConfig'
function Addcause() {
  const id = auth.currentUser.uid
  const cause={
    causeImg: image.secure_url,
    title: req.body.title,
    causeDescription: req.body.causeDescription,
    causeCategory: req.body.causeCategory,
    createdAt: new Date(),
    target: req.body.target,
    current: req.body.current,
    accepted: req.body.accepted,
    status: req.body.status,
    author: {
        connect: { orgId:id}
    }
  }
  const createCause = () => {
    axios
      .post(`http://${ADDRESS_IP}:3001/postcauses`,origin)
      .then(response => {
        console.log(response)
        alert("added succefully");
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text> add cause</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between' 
  }
});

export default Addcause